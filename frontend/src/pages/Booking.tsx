import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Loader2, 
  CheckCircle,
  Ticket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SeatGrid } from '@/components/SeatGrid';
import { BookingStatusBadge } from '@/components/ui/BookingStatusBadge';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { Seat } from '@/types';
import api from '../client';

export default function Booking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedSeats, toggleSeat, clearSelectedSeats, createBooking, isLoading, selectShow } = useBooking();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [show, setShow] = useState<any>(null);
  const [loadingShow, setLoadingShow] = useState(true);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);

  useEffect(() => {
    if (id) {
      loadShow();
    }
    return () => {
      clearSelectedSeats();
    };
  }, [id, clearSelectedSeats]);

  const loadShow = async () => {
    if (!id) return;
    setLoadingShow(true);
    try {
      const res = await api.get(`/shows/${id}`);
      const showData = res.data;
      setShow(showData);
      setBookedSeats(showData.booked_seats || []);
      
      const mappedShow = {
        id: showData.id,
        name: showData.name,
        posterUrl: '/placeholder.svg',
        startTime: showData.start_time,
        totalSeats: showData.total_seats,
        availableSeats: showData.available_seats,
        price: 12.99,
        venue: 'Screen 1',
        genre: 'Drama',
        duration: '2h 0m',
      };
      selectShow(mappedShow);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load show details',
        variant: 'destructive',
      });
    } finally {
      setLoadingShow(false);
    }
  };

  const handleSeatClick = (seat: Seat) => {
    toggleSeat(seat);
  };

  const totalAmount = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }, [selectedSeats]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast({
        title: 'Login required',
        description: 'Please login to book tickets.',
        variant: 'destructive',
      });
      navigate('/login', { state: { from: { pathname: `/booking/${id}` } } });
      return;
    }

    if (selectedSeats.length === 0) {
      toast({
        title: 'No seats selected',
        description: 'Please select at least one seat to proceed.',
        variant: 'destructive',
      });
      return;
    }

    if (!show || !id) {
      toast({
        title: 'Error',
        description: 'Show information not loaded',
        variant: 'destructive',
      });
      return;
    }

    setBookingStatus('processing');
    try {
      await createBooking();
      setBookingStatus('success');
      toast({
        title: 'Booking confirmed!',
        description: `Successfully booked ${selectedSeats.length} seat(s)`,
      });
      await loadShow();
    } catch (error: any) {
      setBookingStatus('failed');
      toast({
        title: 'Booking failed',
        description: error?.response?.data?.error || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loadingShow) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!show) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Show not found</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shows
          </Button>
        </div>
      </div>
    );
  }

  const showDate = new Date(show.start_time);
  const mappedShow = {
    id: show.id,
    name: show.name,
    posterUrl: '/placeholder.svg',
    startTime: show.start_time,
    totalSeats: show.total_seats,
    availableSeats: show.available_seats,
    price: 12.99,
    venue: 'Screen 1',
    genre: 'Drama',
    duration: '2h 0m',
  };

  if (bookingStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="glass rounded-3xl p-8 max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto animate-pulse-glow">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Booking Confirmed!</h1>
            <p className="text-muted-foreground">Your tickets have been booked successfully</p>
          </div>
          <div className="glass rounded-2xl p-4 space-y-3 text-left">
            <div className="flex items-center gap-3">
              <img src={mappedShow.posterUrl} alt={mappedShow.name} className="w-16 h-20 object-cover rounded-lg" />
              <div>
                <h3 className="font-semibold">{mappedShow.name}</h3>
                <p className="text-sm text-muted-foreground">{mappedShow.venue}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Date & Time</span>
              <span>{showDate.toLocaleDateString()} at {showDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Seats</span>
              <span>{selectedSeats.map(s => s.id).join(', ')}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
              <span className="text-muted-foreground">Total Paid</span>
              <span className="text-lg font-bold text-primary">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          <BookingStatusBadge status="CONFIRMED" />
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate('/')}>
              Browse More
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={() => window.print()}>
              <Ticket className="w-4 h-4 mr-2" />
              Download Ticket
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shows
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-center mb-8 text-gradient">Select Your Seats</h2>
              
              <SeatGrid
                totalSeats={show.total_seats}
                bookedSeats={bookedSeats}
                selectedSeats={selectedSeats}
                onSeatClick={handleSeatClick}
                basePrice={mappedShow.price}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass rounded-3xl p-6 sticky top-24 space-y-6">
              <div className="flex gap-4">
                <img
                  src={mappedShow.posterUrl}
                  alt={mappedShow.name}
                  className="w-24 h-32 object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{mappedShow.name}</h3>
                  <span className="inline-block px-2 py-1 rounded-full bg-primary/20 text-primary text-sm">
                    {mappedShow.genre}
                  </span>
                  <p className="text-sm text-muted-foreground">{mappedShow.duration}</p>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-border/50">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{showDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{showDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{mappedShow.venue}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Selected Seats</h4>
                {selectedSeats.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No seats selected</p>
                ) : (
                  <div className="space-y-2">
                    {selectedSeats.map(seat => (
                      <div key={seat.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-medium">
                            {seat.id}
                          </span>
                          <span className="capitalize text-muted-foreground">{seat.type}</span>
                        </div>
                        <span>${seat.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between py-4 border-t border-border/50">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-bold text-gradient">${totalAmount.toFixed(2)}</span>
              </div>

              <Button
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium glow-primary"
                onClick={handleBooking}
                disabled={selectedSeats.length === 0 || isLoading || bookingStatus === 'processing'}
              >
                {bookingStatus === 'processing' ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Ticket className="w-5 h-5 mr-2" />
                    Book {selectedSeats.length} Seat{selectedSeats.length !== 1 ? 's' : ''}
                  </>
                )}
              </Button>
              {!isAuthenticated && (
                <p className="text-center text-sm text-muted-foreground">
                  You'll need to login to complete booking
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
