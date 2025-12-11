import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, MapPin, Ticket, Loader2 } from 'lucide-react';
import api from '../client';

interface Booking {
  id: number;
  show_id: number;
  show_name?: string;
  seats: number[];
  status: string;
  created_at: string;
}

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/bookings');
      const allBookings = res.data || [];
      // Filter bookings for current user
      const userBookings = allBookings.filter((b: any) => b.user_id === user?.id);
      
      // Fetch show names for each booking
      const bookingsWithShows = await Promise.all(
        userBookings.map(async (booking: any) => {
          try {
            const showRes = await api.get(`/shows/${booking.show_id}`);
            return {
              ...booking,
              show_name: showRes.data.name,
            };
          } catch {
            return {
              ...booking,
              show_name: 'Unknown Show',
            };
          }
        })
      );
      
      setBookings(bookingsWithShows);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return { bg: 'rgba(40, 167, 69, 0.2)', border: '#28a745', text: '#51cf66' };
      case 'PENDING':
        return { bg: 'rgba(255, 193, 7, 0.2)', border: '#ffc107', text: '#ffd43b' };
      case 'FAILED':
        return { bg: 'rgba(220, 53, 69, 0.2)', border: '#dc3545', text: '#ff6b6b' };
      default:
        return { bg: 'rgba(108, 117, 125, 0.2)', border: '#6c757d', text: '#adb5bd' };
    }
  };

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundImage: 'url(https://png.pngtree.com/background/20230426/original/pngtree-cinema-movie-theater-background-picture-image_2477892.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(139, 0, 0, 0.95)',
          padding: '2rem',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Please login to view your bookings</p>
          <a href="/login" style={{
            color: '#ff6b6b',
            textDecoration: 'none',
            fontWeight: '600'
          }}>Go to Login →</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(https://png.pngtree.com/background/20230426/original/pngtree-cinema-movie-theater-background-picture-image_2477892.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      paddingTop: '100px',
      paddingBottom: '3rem',
      position: 'relative'
    }}>
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.6)',
        zIndex: 1
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.5rem'
          }}>
            My Bookings
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem' }}>
            View all your movie ticket bookings
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(220, 53, 69, 0.2)',
            border: '1px solid #dc3545',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '2rem',
            color: '#ff6b6b',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 0',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <Loader2 style={{ width: '48px', height: '48px', animation: 'spin 1s linear infinite', color: '#8b0000' }} />
            <p style={{ color: 'white' }}>Loading your bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div style={{
            background: 'rgba(139, 0, 0, 0.8)',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
            color: 'white'
          }}>
            <Ticket style={{ width: '64px', height: '64px', margin: '0 auto 1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>No bookings found</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
              Start booking your favorite movies!
            </p>
            <a href="/" style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #8b0000, #dc143c)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Browse Movies
            </a>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {bookings.map((booking) => {
              const statusStyle = getStatusColor(booking.status);
              const bookingDate = new Date(booking.created_at);
              
              return (
                <div key={booking.id} style={{
                  background: 'rgba(139, 0, 0, 0.9)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: `2px solid ${statusStyle.border}`,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  color: 'white'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '1rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                      flex: 1
                    }}>
                      {booking.show_name || 'Movie Show'}
                    </h3>
                    <span style={{
                      background: statusStyle.bg,
                      border: `1px solid ${statusStyle.border}`,
                      color: statusStyle.text,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {booking.status}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.8)'
                  }}>
                    <Calendar style={{ width: '18px', height: '18px' }} />
                    <span>{bookingDate.toLocaleDateString()}</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.8)'
                  }}>
                    <Clock style={{ width: '18px', height: '18px' }} />
                    <span>{bookingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginTop: '1rem'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.7)',
                      marginBottom: '0.5rem'
                    }}>
                      Seats Booked:
                    </div>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      {booking.seats.map((seat, idx) => (
                        <span key={idx} style={{
                          background: 'rgba(255,255,255,0.2)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}>
                          Seat {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

