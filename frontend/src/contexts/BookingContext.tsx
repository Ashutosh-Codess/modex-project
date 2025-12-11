import React, { createContext, useContext, useState, useCallback, type ReactNode, useMemo } from 'react';
import api from '../client';
import type { Show, Seat, Booking, BookingState } from '@/types';

interface BookingContextType extends BookingState {
  fetchShows: () => Promise<void>;
  selectShow: (show: Show) => void;
  toggleSeat: (seat: Seat) => void;
  clearSelectedSeats: () => void;
  createBooking: () => Promise<Booking>;
  createShow: (show: Omit<Show, 'id' | 'availableSeats'>) => Promise<void>;
  deleteShow: (id: number) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const DEFAULT_PRICE = 12.99;
const DEFAULT_VENUE = 'Screen 1';
const DEFAULT_GENRE = 'Drama';
const DEFAULT_DURATION = '2h 0m';

function mapBackendShowToFrontend(backendShow: any): Show {
  return {
    id: backendShow.id,
    name: backendShow.name,
    posterUrl: `/placeholder.svg`,
    startTime: backendShow.start_time,
    totalSeats: backendShow.total_seats,
    availableSeats: backendShow.available_seats || backendShow.total_seats,
    price: DEFAULT_PRICE,
    venue: DEFAULT_VENUE,
    genre: DEFAULT_GENRE,
    duration: DEFAULT_DURATION,
  };
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>({
    shows: [],
    selectedShow: null,
    selectedSeats: [],
    currentBooking: null,
    isLoading: false,
    error: null,
  });

  const fetchShows = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const res = await api.get('/shows');
      const backendShows = Array.isArray(res.data) ? res.data : [];
      const mappedShows = backendShows.map(mapBackendShowToFrontend);
      setState(prev => ({
        ...prev,
        shows: mappedShows,
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      console.error("Error fetching shows:", error);
      const errorMessage = error?.response?.data?.error || error?.message || 'Failed to fetch shows';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        shows: [], // Set empty array on error
      }));
    }
  }, []);

  const selectShow = useCallback((show: Show) => {
    setState(prev => ({
      ...prev,
      selectedShow: show,
      selectedSeats: [],
    }));
  }, []);

  const toggleSeat = useCallback((seat: Seat) => {
    setState(prev => {
      const isSelected = prev.selectedSeats.some(s => s.id === seat.id);
      
      if (isSelected) {
        return {
          ...prev,
          selectedSeats: prev.selectedSeats.filter(s => s.id !== seat.id),
        };
      } else {
        return {
          ...prev,
          selectedSeats: [...prev.selectedSeats, { ...seat, status: 'selected' }],
        };
      }
    });
  }, []);

  const clearSelectedSeats = useCallback(() => {
    setState(prev => ({ ...prev, selectedSeats: [] }));
  }, []);

  const createBooking = useCallback(async (): Promise<Booking> => {
    if (!state.selectedShow || state.selectedSeats.length === 0) {
      throw new Error('No show or seats selected');
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const seatNumbers = state.selectedSeats.map(seat => {
        const rowIndex = seat.row.charCodeAt(0) - 65;
        const seatsPerRow = 12;
        return rowIndex * seatsPerRow + seat.number;
      });

      const res = await api.post('/bookings', {
        show_id: state.selectedShow.id,
        seats: seatNumbers,
      });

      const booking: Booking = {
        id: res.data.id,
        showId: state.selectedShow.id,
        userId: res.data.user_id,
        seats: state.selectedSeats,
        totalAmount: state.selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
        status: res.data.status || 'CONFIRMED',
        createdAt: res.data.created_at,
      };
      
      setState(prev => ({
        ...prev,
        currentBooking: booking,
        selectedSeats: [],
        isLoading: false,
      }));
      
      return booking;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || error?.message || 'Failed to create booking';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw new Error(errorMessage);
    }
  }, [state.selectedShow, state.selectedSeats]);

  const createShow = useCallback(async (show: Omit<Show, 'id' | 'availableSeats'>) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await api.post('/shows', {
        name: show.name,
        start_time: show.startTime,
        total_seats: show.totalSeats,
      });
      
      await fetchShows();
      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error?.response?.data?.error || 'Failed to create show',
      }));
      throw error;
    }
  }, [fetchShows]);

  const deleteShow = useCallback(async (id: number) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const res = await api.delete(`/shows/${id}`).catch(() => {
        throw new Error('Delete endpoint not available');
      });
      await fetchShows();
      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error?.response?.data?.error || error?.message || 'Failed to delete show',
      }));
      throw error;
    }
  }, [fetchShows]);

  const value = useMemo(() => ({
    ...state,
    fetchShows,
    selectShow,
    toggleSeat,
    clearSelectedSeats,
    createBooking,
    createShow,
    deleteShow,
  }), [state, fetchShows, selectShow, toggleSeat, clearSelectedSeats, createBooking, createShow, deleteShow]);

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
