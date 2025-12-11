# Architecture and Scaling Plan

## Overview
A stateless Express API fronts a PostgreSQL database. React consumes the API. JWT secures user actions. Booking writes use transactional row locks to prevent overbooking.

## Components
- API Gateway: Express with routes for auth, shows, bookings.
- Auth: JWT issued at login/signup, validated per request.
- Data: PostgreSQL with tables users, shows, bookings.
- Frontend: React SPA with Context for auth state.

## Database
- users(id, name, email unique, password_hash, created_at)
- shows(id, name, start_time, total_seats, created_at)
- bookings(id, show_id fk, user_id fk, user_name, seats int[], status, created_at)
- Indexes on shows(id,start_time) and bookings(show_id,status).
- Concurrency: SELECT ... FOR UPDATE on show row and shared lock on confirmed seats before insert. Transactions ensure atomic booking.

Scaling:
- Read replicas for GET-heavy endpoints.
- Partition bookings by show_id when volume grows.
- Connection pooling sized for app pods.

## Concurrency and Consistency
- Booking transaction steps:
  1) Lock show row FOR UPDATE.
  2) Validate seat numbers in range.
  3) Read confirmed seats with FOR SHARE and reject conflicts.
  4) Insert booking as CONFIRMED.
- Background expiry updates PENDING rows older than 2 minutes (hook for future holds).
- Idempotency can be added via client tokens stored in a unique column.

## Caching
- Short-lived cache for GET /shows and GET /shows/:id using CDN or Redis to reduce DB reads.
- Invalidate on new booking or show creation by publishing cache-bust events.

## Messaging
- For high scale, place booking requests onto a queue (e.g., RabbitMQ/Kafka) with a worker performing the transactional write, enabling smoothing under spikes.
- Emit booking events for analytics or notification services.

## Availability and Deployment
- Containerize frontend and backend.
- Deploy backend on Render/Railway/AWS with health checks and autoscaling.
- Use managed Postgres with automated backups and PITR.
- Use HTTPS and secure env storage. Rotate JWT secret and DB credentials via platform secrets.

## Observability
- Structured JSON logs with request ids.
- Metrics: booking latency, error rates, seat conflict counts, DB connection usage.
- Alerts on elevated 5xx or conflict spikes.


