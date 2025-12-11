export interface User {
  id: number;
  email: string;
  name: string;
  role?: 'admin' | 'user';
}

export interface Show {
  id: number;
  name: string;
  posterUrl: string;
  startTime: string;
  totalSeats: number;
  availableSeats: number;
  price: number;
  venue: string;
  genre: string;
  duration: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'regular' | 'premium' | 'vip';
  status: 'available' | 'selected' | 'booked';
  price: number;
}

export interface Booking {
  id: number;
  showId: number;
  userId: number;
  seats: Seat[];
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface BookingState {
  shows: Show[];
  selectedShow: Show | null;
  selectedSeats: Seat[];
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
}
