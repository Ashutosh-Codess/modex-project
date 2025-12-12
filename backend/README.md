# Backend API - Ticket Booking System

A robust Node.js/Express backend for a ticket booking system with PostgreSQL, featuring concurrency control, booking expiry, and JWT authentication.

## 🚀 Features

- ✅ **Show Management**: Create, read, update, delete shows
- ✅ **User Authentication**: JWT-based signup/login
- ✅ **Seat Booking**: Book multiple seats with concurrency protection
- ✅ **Concurrency Control**: Database transactions with row-level locking
- ✅ **Booking Expiry**: Automatic expiry of PENDING bookings after 2 minutes
- ✅ **Overbooking Prevention**: Atomic operations prevent double booking
- ✅ **RESTful API**: Clean, well-documented endpoints

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=modex

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars

# Server Configuration
PORT=4000
NODE_ENV=development
```

### 3. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE modex;

# Exit psql
\q
```

### 4. Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will:
- Automatically create tables on first run
- Start on http://localhost:4000
- Run booking expiry job every 2 minutes

## 📚 API Documentation

### Base URL
```
http://localhost:4000
```

### Authentication Endpoints

#### POST /auth/signup
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### GET /auth/me
Get current user (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Show Endpoints

#### GET /shows
Get all available shows.

**Response:**
```json
[
  {
    "id": 1,
    "name": "The Dark Knight",
    "start_time": "2025-12-15T19:00:00Z",
    "total_seats": 100,
    "available_seats": 85,
    "created_at": "2025-12-01T10:00:00Z"
  }
]
```

#### GET /shows/:id
Get show details with booked seats.

**Response:**
```json
{
  "id": 1,
  "name": "The Dark Knight",
  "start_time": "2025-12-15T19:00:00Z",
  "total_seats": 100,
  "available_seats": 85,
  "booked_seats": [1, 5, 10, 15],
  "created_at": "2025-12-01T10:00:00Z"
}
```

#### POST /shows
Create a new show (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Inception",
  "start_time": "2025-12-16T20:00:00Z",
  "total_seats": 120
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Inception",
  "start_time": "2025-12-16T20:00:00Z",
  "total_seats": 120,
  "available_seats": 120,
  "created_at": "2025-12-01T11:00:00Z"
}
```

#### DELETE /shows/:id
Delete a show (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Show deleted successfully",
  "show": { ... }
}
```

### Booking Endpoints

#### GET /bookings
Get all bookings (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "user_name": "John Doe",
    "show_id": 1,
    "seats": [5, 6, 7],
    "status": "CONFIRMED",
    "created_at": "2025-12-01T12:00:00Z"
  }
]
```

#### POST /bookings
Create a new booking (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "show_id": 1,
  "seats": [5, 6, 7]
}
```

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "user_name": "John Doe",
  "show_id": 1,
  "seats": [5, 6, 7],
  "status": "CONFIRMED",
  "created_at": "2025-12-01T12:00:00Z"
}
```

**Error Responses:**

- `400 Bad Request`: Invalid payload
- `404 Not Found`: Show not found
- `409 Conflict`: Seats already booked
- `500 Internal Server Error`: Server error

## 🔒 Concurrency Control

The system uses PostgreSQL transactions with row-level locking to prevent overbooking:

1. **FOR UPDATE Lock**: Locks the show row during booking
2. **FOR SHARE Lock**: Prevents conflicting reads
3. **Transaction Isolation**: Ensures atomic operations
4. **Automatic Rollback**: On any error, transaction is rolled back

## ⏰ Booking Expiry

PENDING bookings automatically expire after 2 minutes:

- Background job runs every 2 minutes
- Updates PENDING bookings older than 2 minutes to FAILED
- Frees up seats for other users

## 🧪 Testing

### Seed Sample Data

```bash
npm run seed
```

This creates sample shows for testing.

### Test with cURL

```bash
# Get all shows
curl http://localhost:4000/shows

# Create booking (replace token)
curl -X POST http://localhost:4000/bookings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"show_id": 1, "seats": [1, 2, 3]}'
```

## 🚀 Deployment

### Environment Variables for Production

```env
DB_HOST=your_db_host
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=modex
JWT_SECRET=your_production_secret_min_32_chars
PORT=4000
NODE_ENV=production
```

### Recommended Platforms

- **Render**: Easy PostgreSQL integration
- **Railway**: Simple deployment
- **AWS EC2**: Full control
- **Heroku**: Traditional PaaS

### Build Command
```bash
npm start
```

### Health Check
```bash
curl http://your-backend-url/
# Should return: "Backend server is running"
```

## 📊 Database Schema

See `src/db/db.js` for complete schema. Key tables:

- **users**: User accounts
- **shows**: Movie shows/events
- **bookings**: Seat bookings

## 🔧 Troubleshooting

### Database Connection Issues

1. Verify PostgreSQL is running
2. Check `.env` file has correct credentials
3. Ensure database exists: `CREATE DATABASE modex;`

### Port Already in Use

Change `PORT` in `.env` file or kill the process:
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:4000 | xargs kill
```

### JWT Errors

Ensure `JWT_SECRET` is at least 32 characters long.

## 📝 License

MIT

