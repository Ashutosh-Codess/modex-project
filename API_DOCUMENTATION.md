# API Documentation - Ticket Booking System

Complete API documentation for the Ticket Booking System backend.

## Base URL

**Development:** `http://localhost:4000`  
**Production:** `https://your-backend-url.com`

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### POST /auth/signup
Register a new user.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
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

**Errors:**
- `400`: Missing required fields
- `409`: Email already exists

---

#### POST /auth/login
Login with email and password.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
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

**Errors:**
- `400`: Missing email or password
- `401`: Invalid credentials

---

#### GET /auth/me
Get current authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2025-12-01T10:00:00Z"
}
```

**Errors:**
- `401`: Unauthorized (invalid or missing token)

---

### Shows

#### GET /shows
Get all available shows.

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "The Dark Knight",
    "start_time": "2025-12-15T19:00:00Z",
    "total_seats": 100,
    "available_seats": 85,
    "created_at": "2025-12-01T10:00:00Z"
  },
  {
    "id": 2,
    "name": "Inception",
    "start_time": "2025-12-16T20:00:00Z",
    "total_seats": 120,
    "available_seats": 120,
    "created_at": "2025-12-01T11:00:00Z"
  }
]
```

---

#### GET /shows/:id
Get show details with booked seats.

**Response (200):**
```json
{
  "id": 1,
  "name": "The Dark Knight",
  "start_time": "2025-12-15T19:00:00Z",
  "total_seats": 100,
  "available_seats": 85,
  "booked_seats": [1, 5, 10, 15, 20],
  "created_at": "2025-12-01T10:00:00Z"
}
```

**Errors:**
- `404`: Show not found

---

#### POST /shows
Create a new show (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "name": "Interstellar",
  "start_time": "2025-12-17T18:30:00Z",
  "total_seats": 150
}
```

**Response (200):**
```json
{
  "id": 3,
  "name": "Interstellar",
  "start_time": "2025-12-17T18:30:00Z",
  "total_seats": 150,
  "available_seats": 150,
  "created_at": "2025-12-01T12:00:00Z"
}
```

**Errors:**
- `400`: Missing required fields
- `401`: Unauthorized

---

#### DELETE /shows/:id
Delete a show (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Show deleted successfully",
  "show": {
    "id": 3,
    "name": "Interstellar",
    ...
  }
}
```

**Errors:**
- `404`: Show not found
- `401`: Unauthorized

---

### Bookings

#### GET /bookings
Get all bookings (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
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
  },
  {
    "id": 2,
    "user_id": 1,
    "user_name": "John Doe",
    "show_id": 2,
    "seats": [10, 11],
    "status": "CONFIRMED",
    "created_at": "2025-12-01T13:00:00Z"
  }
]
```

**Errors:**
- `401`: Unauthorized

---

#### POST /bookings
Create a new booking (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "show_id": 1,
  "seats": [5, 6, 7]
}
```

**Response (200):**
```json
{
  "id": 3,
  "user_id": 1,
  "user_name": "John Doe",
  "show_id": 1,
  "seats": [5, 6, 7],
  "status": "CONFIRMED",
  "created_at": "2025-12-01T14:00:00Z"
}
```

**Errors:**
- `400`: Invalid payload (missing show_id or seats, empty seats array)
- `404`: Show not found
- `409`: One or more seats already booked
- `401`: Unauthorized
- `500`: Server error

**Notes:**
- Seats must be an array of integers
- Seats are automatically deduplicated
- Booking uses database transactions to prevent overbooking
- Status is set to CONFIRMED immediately upon successful booking

---

## Status Codes

- `200`: Success
- `400`: Bad Request (invalid input)
- `401`: Unauthorized (missing or invalid token)
- `404`: Not Found
- `409`: Conflict (e.g., seats already booked)
- `500`: Internal Server Error

## Booking Status

- `PENDING`: Booking is pending (not used in current implementation)
- `CONFIRMED`: Booking is confirmed
- `FAILED`: Booking failed (expired or error)

## Concurrency Handling

The booking endpoint uses PostgreSQL transactions with row-level locking:

1. **FOR UPDATE**: Locks the show row
2. **FOR SHARE**: Prevents conflicting reads
3. **Transaction**: Ensures atomicity
4. **Automatic Rollback**: On any error

This prevents:
- Double booking of the same seat
- Race conditions in concurrent requests
- Data inconsistency

## Booking Expiry

PENDING bookings automatically expire after 2 minutes:
- Background job runs every 2 minutes
- Updates old PENDING bookings to FAILED
- Currently, all bookings are CONFIRMED immediately

## Example Requests

### Using cURL

```bash
# Signup
curl -X POST http://localhost:4000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get shows
curl http://localhost:4000/shows

# Create booking (replace TOKEN)
curl -X POST http://localhost:4000/bookings \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"show_id":1,"seats":[5,6,7]}'
```

### Using JavaScript/Fetch

```javascript
// Login
const loginResponse = await fetch('http://localhost:4000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
});
const { token } = await loginResponse.json();

// Get shows
const showsResponse = await fetch('http://localhost:4000/shows');
const shows = await showsResponse.json();

// Create booking
const bookingResponse = await fetch('http://localhost:4000/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    show_id: 1,
    seats: [5, 6, 7]
  })
});
const booking = await bookingResponse.json();
```

## Postman Collection

Import the following collection into Postman:

```json
{
  "info": {
    "name": "Ticket Booking API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Signup",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/signup",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Shows",
      "item": [
        {
          "name": "Get All Shows",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/shows"
          }
        },
        {
          "name": "Get Show by ID",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/shows/1"
          }
        }
      ]
    },
    {
      "name": "Bookings",
      "item": [
        {
          "name": "Create Booking",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/bookings",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"show_id\": 1,\n  \"seats\": [5, 6, 7]\n}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:4000"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

Save this as `Ticket_Booking_API.postman_collection.json` and import into Postman.



