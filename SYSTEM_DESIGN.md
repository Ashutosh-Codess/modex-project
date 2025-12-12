# System Design Document - Ticket Booking System

## Executive Summary

This document outlines the architecture, design decisions, and scalability considerations for a production-grade ticket booking system similar to BookMyShow or RedBus. The system is designed to handle high concurrency, prevent overbooking, and scale to support millions of users.

## 1. High-Level System Architecture

### Architecture Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   CDN/Edge   │────▶│  Load       │
│  (Browser)  │     │   (Vercel)   │     │  Balancer   │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                         │                         │
              ┌─────▼─────┐            ┌─────▼─────┐            ┌─────▼─────┐
              │  Frontend │            │  Frontend │            │  Frontend │
              │  Server 1 │            │  Server 2 │            │  Server N │
              └─────┬─────┘            └─────┬─────┘            └─────┬─────┘
                    │                         │                         │
                    └─────────────────────────┼─────────────────────────┘
                                              │
                                    ┌─────────▼─────────┐
                                    │   API Gateway     │
                                    │  (Rate Limiting)  │
                                    └─────────┬─────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                         │                         │
              ┌─────▼─────┐            ┌─────▼─────┐            ┌─────▼─────┐
              │  Backend │            │  Backend │            │  Backend │
              │  Server 1 │            │  Server 2 │            │  Server N │
              └─────┬─────┘            └─────┬─────┘            └─────┬─────┘
                    │                         │                         │
                    └─────────────────────────┼─────────────────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                         │                         │
              ┌─────▼─────┐            ┌─────▼─────┐            ┌─────▼─────┐
              │  Message  │            │  Cache     │            │  Database │
              │  Queue    │            │  (Redis)   │            │  Cluster  │
              │  (RabbitMQ)│           └───────────┘            └───────────┘
              └───────────┘
```

### Key Components

1. **Frontend Layer**: React application deployed on Vercel with CDN
2. **API Gateway**: Rate limiting, authentication, request routing
3. **Backend Services**: Node.js/Express microservices
4. **Message Queue**: RabbitMQ/Kafka for async processing
5. **Cache Layer**: Redis for frequently accessed data
6. **Database**: PostgreSQL with read replicas and sharding

## 2. Database Design and Scaling Strategy

### Current Database Schema

```sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shows Table
CREATE TABLE shows (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    total_seats INTEGER NOT NULL,
    available_seats INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    show_id INTEGER REFERENCES shows(id),
    seats INTEGER[] NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Scaling Strategies

#### 2.1 Database Sharding

**Horizontal Sharding by Show ID:**
- Partition shows across multiple database instances
- Shard key: `show_id % num_shards`
- Benefits: Distributes load, improves query performance
- Implementation: Use sharding middleware or database proxy

```javascript
// Pseudo-code for sharding logic
function getShard(showId) {
    const numShards = 4;
    return `db_shard_${showId % numShards}`;
}
```

#### 2.2 Read Replicas

- **Master-Slave Replication**: One write master, multiple read replicas
- **Use Cases**:
  - Read-heavy operations (listing shows, checking availability)
  - Analytics queries
  - Reporting
- **Implementation**: PostgreSQL streaming replication

#### 2.3 Database Indexing Strategy

```sql
-- Critical indexes for performance
CREATE INDEX idx_bookings_show_id ON bookings(show_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_shows_start_time ON shows(start_time);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
```

#### 2.4 Connection Pooling

- Use PgBouncer or similar for connection pooling
- Reduces database connection overhead
- Handles connection spikes efficiently

## 3. Concurrency Control Mechanisms

### 3.1 Database-Level Locking

**Current Implementation:**
- **Row-Level Locking**: `FOR UPDATE` on show records
- **Transaction Isolation**: SERIALIZABLE for critical operations
- **Pessimistic Locking**: Prevents concurrent modifications

```javascript
// Current implementation
await client.query("BEGIN");
const show = await client.query(
    "SELECT * FROM shows WHERE id=$1 FOR UPDATE",
    [show_id]
);
// ... booking logic ...
await client.query("COMMIT");
```

### 3.2 Optimistic Locking (Alternative Approach)

```sql
-- Add version column
ALTER TABLE shows ADD COLUMN version INTEGER DEFAULT 0;

-- Update with version check
UPDATE shows 
SET available_seats = available_seats - $1, version = version + 1
WHERE id = $2 AND version = $3;
```

### 3.3 Distributed Locking (Redis)

For multi-server deployments:

```javascript
// Redis-based distributed lock
async function acquireLock(showId) {
    const lockKey = `lock:show:${showId}`;
    const lockValue = generateUniqueId();
    const acquired = await redis.set(lockKey, lockValue, 'EX', 10, 'NX');
    return acquired ? lockValue : null;
}

async function releaseLock(showId, lockValue) {
    const lockKey = `lock:show:${showId}`;
    const currentValue = await redis.get(lockKey);
    if (currentValue === lockValue) {
        await redis.del(lockKey);
    }
}
```

### 3.4 Message Queue for Booking Processing

**Why Use Message Queue:**
- Decouples booking requests from processing
- Handles traffic spikes
- Enables retry mechanisms
- Prevents system overload

**Implementation with RabbitMQ:**

```javascript
// Producer: Accept booking request
async function createBookingRequest(bookingData) {
    await channel.sendToQueue('booking_queue', 
        Buffer.from(JSON.stringify(bookingData)),
        { persistent: true }
    );
    return { status: 'PENDING', messageId: bookingData.id };
}

// Consumer: Process booking
async function processBooking(message) {
    const bookingData = JSON.parse(message.content);
    try {
        const result = await processBookingTransaction(bookingData);
        await channel.ack(message);
        return result;
    } catch (error) {
        await channel.nack(message, false, true); // Retry
    }
}
```

## 4. Caching Strategy

### 4.1 Redis Cache Architecture

**Cache Layers:**

1. **Show Availability Cache**
   ```javascript
   // Cache key: show:{showId}:availability
   // TTL: 5 seconds (frequent updates)
   const cacheKey = `show:${showId}:availability`;
   const availability = await redis.get(cacheKey);
   ```

2. **Show List Cache**
   ```javascript
   // Cache key: shows:list:{city}:{date}
   // TTL: 60 seconds
   const cacheKey = `shows:list:${city}:${date}`;
   ```

3. **User Session Cache**
   ```javascript
   // Cache key: session:{userId}
   // TTL: 24 hours
   const sessionKey = `session:${userId}`;
   ```

### 4.2 Cache Invalidation Strategy

**Write-Through Cache:**
- Update cache immediately when data changes
- Ensures consistency

**Cache-Aside Pattern:**
```javascript
async function getShow(showId) {
    // Try cache first
    let show = await redis.get(`show:${showId}`);
    if (show) return JSON.parse(show);
    
    // Cache miss - fetch from DB
    show = await db.query('SELECT * FROM shows WHERE id=$1', [showId]);
    
    // Update cache
    await redis.setex(`show:${showId}`, 300, JSON.stringify(show));
    return show;
}
```

### 4.3 CDN Caching

- Static assets (images, CSS, JS) cached at edge
- API responses for public data (show listings)
- Reduces origin server load

## 5. Message Queue Usage

### 5.1 Booking Processing Pipeline

```
User Request → API Gateway → Message Queue → Booking Processor → Database
                                      ↓
                              Notification Service
                                      ↓
                              Email/SMS Service
```

### 5.2 Queue Architecture

**Primary Queue: `booking_queue`**
- Priority: High
- Durability: Yes
- Dead Letter Queue: `booking_dlq`

**Secondary Queues:**
- `notification_queue`: Email/SMS notifications
- `analytics_queue`: Event tracking
- `payment_queue`: Payment processing

### 5.3 Benefits

1. **Decoupling**: Services operate independently
2. **Reliability**: Messages persist, retry on failure
3. **Scalability**: Add more consumers as needed
4. **Resilience**: System continues even if one service fails

## 6. Performance Optimizations

### 6.1 Database Query Optimization

- **Batch Operations**: Group multiple queries
- **Prepared Statements**: Reduce parsing overhead
- **Query Result Caching**: Cache frequent queries
- **Connection Pooling**: Reuse database connections

### 6.2 API Optimization

- **Response Compression**: Gzip/Brotli compression
- **Pagination**: Limit result sets
- **Field Selection**: Return only required fields
- **GraphQL**: Allow clients to request specific fields

### 6.3 Frontend Optimization

- **Code Splitting**: Lazy load routes
- **Image Optimization**: WebP format, lazy loading
- **Service Workers**: Offline support, caching
- **Virtual Scrolling**: For large lists

## 7. Security Considerations

### 7.1 Authentication & Authorization

- **JWT Tokens**: Stateless authentication
- **Token Refresh**: Short-lived access tokens
- **Role-Based Access**: Admin vs User permissions
- **Rate Limiting**: Prevent abuse

### 7.2 Data Protection

- **Encryption at Rest**: Database encryption
- **Encryption in Transit**: HTTPS/TLS
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization

### 7.3 API Security

- **CORS Configuration**: Restrict origins
- **API Rate Limiting**: Per user/IP limits
- **Request Validation**: Input sanitization
- **DDoS Protection**: CloudFlare/WAF

## 8. Monitoring & Observability

### 8.1 Metrics

- **Application Metrics**: Response times, error rates
- **Database Metrics**: Query performance, connection pool
- **Infrastructure Metrics**: CPU, memory, network
- **Business Metrics**: Bookings per hour, revenue

### 8.2 Logging

- **Structured Logging**: JSON format
- **Log Aggregation**: ELK Stack or similar
- **Error Tracking**: Sentry or similar
- **Audit Logs**: Track all booking operations

### 8.3 Alerting

- **Error Rate Thresholds**: Alert on high error rates
- **Performance Degradation**: Alert on slow responses
- **Database Issues**: Alert on connection failures
- **Capacity Warnings**: Alert on resource exhaustion

## 9. Disaster Recovery

### 9.1 Backup Strategy

- **Database Backups**: Daily full backups, hourly incremental
- **Point-in-Time Recovery**: WAL archiving
- **Backup Testing**: Regular restore tests
- **Geographic Redundancy**: Multi-region backups

### 9.2 Failover Strategy

- **Database Failover**: Automatic master-slave failover
- **Application Failover**: Load balancer health checks
- **Multi-Region Deployment**: Active-active or active-passive
- **RTO/RPO Targets**: Recovery Time Objective < 1 hour

## 10. Cost Optimization

### 10.1 Infrastructure Costs

- **Auto-Scaling**: Scale down during low traffic
- **Reserved Instances**: For predictable workloads
- **Spot Instances**: For non-critical workloads
- **CDN Usage**: Reduce origin server costs

### 10.2 Database Costs

- **Read Replicas**: Use for read-heavy operations
- **Connection Pooling**: Reduce connection costs
- **Query Optimization**: Reduce compute costs
- **Archive Old Data**: Move to cheaper storage

## 11. Future Enhancements

### 11.1 Microservices Architecture

- **Service Decomposition**: Split into smaller services
  - Booking Service
  - Payment Service
  - Notification Service
  - Analytics Service

### 11.2 Event-Driven Architecture

- **Event Sourcing**: Store all events
- **CQRS**: Separate read/write models
- **Event Streaming**: Kafka for event processing

### 11.3 Advanced Features

- **Real-time Updates**: WebSocket connections
- **Recommendation Engine**: ML-based suggestions
- **Dynamic Pricing**: Demand-based pricing
- **Waitlist System**: Queue for sold-out shows

## Conclusion

This system design provides a scalable, reliable, and performant foundation for a production-grade ticket booking system. The architecture can handle millions of concurrent users while maintaining data consistency and preventing overbooking through multiple layers of concurrency control.

The key to success is:
1. **Start Simple**: Current implementation with transactions and locks
2. **Scale Gradually**: Add caching, queues, and replicas as needed
3. **Monitor Continuously**: Track metrics and optimize based on data
4. **Plan for Growth**: Design with scalability in mind from the start

