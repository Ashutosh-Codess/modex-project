# Frontend - Ticket Booking System

A modern React + TypeScript frontend for the ticket booking system, featuring a beautiful UI, real-time updates, and seamless backend integration.

## 🚀 Features

- ✅ **Modern UI**: Beautiful, responsive design with animations
- ✅ **User Authentication**: Signup/Login with JWT
- ✅ **Show Management**: Admin can create and manage shows
- ✅ **Seat Booking**: Interactive seat selection with visual feedback
- ✅ **Real-time Updates**: Live seat availability
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Responsive Design**: Works on mobile and desktop
- ✅ **Context API**: Efficient state management
- ✅ **TypeScript**: Type-safe code

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see backend README)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:4000
```

For production, set this to your deployed backend URL:
```env
VITE_API_URL=https://your-backend.onrender.com
```

### 3. Start Development Server

```bash
npm run dev
```

The app will start on http://localhost:5173

### 4. Build for Production

```bash
npm run build
```

Output will be in the `dist` directory.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   │   ├── ui/          # UI components (buttons, inputs, etc.)
│   │   ├── Topbar.tsx   # Navigation bar
│   │   ├── ShowCard.tsx # Movie/show card
│   │   └── ...
│   ├── contexts/        # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state
│   │   └── BookingContext.tsx # Booking state
│   ├── pages/           # Page components
│   │   ├── Home.tsx     # Home page (show listings)
│   │   ├── Login.tsx    # Login page
│   │   ├── Signup.tsx   # Signup page
│   │   ├── Booking.tsx  # Seat booking page
│   │   ├── Admin.tsx    # Admin dashboard
│   │   └── MyBookings.tsx # User bookings
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── package.json
```

## 🎨 Features Overview

### User Features

1. **Browse Shows**
   - View all available shows
   - Search and filter shows
   - See availability in real-time

2. **Book Seats**
   - Select show
   - Choose seats visually
   - Confirm booking
   - See booking status

3. **My Bookings**
   - View all your bookings
   - See booking details
   - Track booking status

### Admin Features

1. **Create Shows**
   - Add new shows
   - Set show details
   - Manage show list

2. **View Statistics**
   - See booking statistics
   - Monitor show performance

## 🔌 API Integration

The frontend uses Axios to communicate with the backend:

```typescript
// Example API call
import api from '@/client';

// Get all shows
const shows = await api.get('/shows');

// Create booking
const booking = await api.post('/bookings', {
  show_id: 1,
  seats: [5, 6, 7]
});
```

## 🎯 State Management

### Context API Usage

**AuthContext**: Manages user authentication
```typescript
const { user, login, logout, isAuthenticated } = useAuth();
```

**BookingContext**: Manages shows and bookings
```typescript
const { shows, fetchShows, createBooking } = useBooking();
```

## 🛣️ Routing

Routes are defined in `App.tsx`:

- `/` - Home page (show listings)
- `/login` - Login page
- `/signup` - Signup page
- `/booking/:id` - Booking page for specific show
- `/admin` - Admin dashboard (protected)
- `/my-bookings` - User bookings (protected)

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Inline Styles**: For dynamic styling
- **Framer Motion**: For animations
- **Responsive Design**: Mobile-first approach

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI** (optional):
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
cd frontend
vercel
```

3. **Set Environment Variable**:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com`

4. **Configure Build Settings**:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Netlify Deployment

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL`

## 🧪 Testing

### Manual Testing Checklist

- [ ] User can signup/login
- [ ] User can view shows
- [ ] User can book seats
- [ ] Admin can create shows
- [ ] Error messages display correctly
- [ ] Loading states work
- [ ] Responsive design works on mobile

## 🔧 Troubleshooting

### Build Errors

1. **TypeScript Errors**: Run `npm run build` to see errors
2. **Missing Dependencies**: Run `npm install`
3. **Environment Variables**: Ensure `.env` file exists

### API Connection Issues

1. Check `VITE_API_URL` is set correctly
2. Verify backend is running
3. Check browser console for CORS errors
4. Ensure backend CORS allows your frontend URL

### Blank Page After Deployment

1. Check Vercel build logs
2. Verify environment variables are set
3. Check browser console for errors
4. Ensure root directory is set to `frontend`

## 📝 Assumptions

1. **Authentication**: JWT tokens stored in localStorage
2. **Seat Numbers**: Seats are numbered 1 to total_seats
3. **Booking Status**: PENDING → CONFIRMED or FAILED
4. **Admin Access**: First user or users with role='admin'

## ⚠️ Known Limitations

1. **No Real-time Updates**: Seat availability updates on page refresh
2. **No Payment Integration**: Booking is free
3. **No Email Notifications**: Bookings confirmed immediately
4. **Single Database**: No read replicas or sharding

## 🎯 Future Enhancements

- [ ] WebSocket for real-time updates
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced filtering and search
- [ ] User profiles
- [ ] Booking history with filters
- [ ] Seat recommendations
- [ ] Social sharing

## 📄 License

MIT
