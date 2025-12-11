# Modex Ticket Booking System

A full-stack ticket booking system built with React, TypeScript, Node.js, Express, and PostgreSQL.

## Features

- 🎬 Show Management - Create and manage movie shows
- 🎫 Seat Booking - Interactive seat selection with real-time availability
- 🔐 User Authentication - Secure signup/login with JWT
- 🎨 Modern UI - Beautiful, responsive design with animations
- ⚡ Real-time Updates - Live seat availability tracking
- 🔒 Concurrency Safe - Prevents double booking with database transactions

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios

### Backend
- Node.js + Express
- PostgreSQL
- JWT Authentication
- bcryptjs for password hashing

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=modex
JWT_SECRET=your_secret_key
PORT=4000
```

4. Create database:
```sql
CREATE DATABASE modex;
```

5. Start server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:4000
```

4. Start dev server:
```bash
npm run dev
```

## Deployment

### Vercel (Frontend)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Set environment variable `VITE_API_URL` to your backend URL

### Backend Deployment

Deploy backend to Railway, Render, or any Node.js hosting service.

Set environment variables:
- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME
- JWT_SECRET
- PORT

## API Endpoints

### Auth
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### Shows
- `GET /shows` - List all shows
- `GET /shows/:id` - Get show details
- `POST /shows` - Create show (admin)
- `DELETE /shows/:id` - Delete show (admin)

### Bookings
- `GET /bookings` - List bookings
- `POST /bookings` - Create booking (requires auth)

## License

MIT
