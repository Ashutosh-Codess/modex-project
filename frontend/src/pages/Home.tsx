import { useEffect, useState } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import { ShowCard } from '@/components/ShowCard';
import { useBooking } from '@/contexts/BookingContext';
import { Link } from 'react-router-dom';
import type { Show } from '@/types';

const genres = ['All', 'Action', 'Sci-Fi', 'Crime', 'Drama', 'Comedy', 'Horror'];

export default function Home() {
  const { shows, fetchShows, isLoading, error } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchShows().catch((err) => {
      console.error("Failed to fetch shows:", err);
    });
  }, [fetchShows]);

  const filteredShows = shows
    .filter((show: Show) => {
      const matchesSearch = show.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || show.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a: Show, b: Show) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'availability':
          return b.availableSeats - a.availableSeats;
        default:
          return 0;
      }
    });

  const [selectedLocation, setSelectedLocation] = useState('Mumbai');

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundImage: 'url(/cinema-bg.jpg.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      paddingTop: '90px', 
      paddingBottom: '3rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative'
    }}>
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1
      }} />
      {/* Location Prompt */}
      {!selectedLocation && (
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '600px',
          margin: '0 auto 2rem',
          background: 'rgba(139, 0, 0, 0.95)',
          borderRadius: '16px',
          padding: '2rem',
          border: '2px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ color: 'white', fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>
            Select Your Location
          </h3>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              fontSize: '1rem',
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="" style={{ background: '#8b0000', color: 'white' }}>Choose your city...</option>
            <option value="Mumbai" style={{ background: '#8b0000', color: 'white' }}>Mumbai</option>
            <option value="Delhi" style={{ background: '#8b0000', color: 'white' }}>Delhi</option>
            <option value="Bangalore" style={{ background: '#8b0000', color: 'white' }}>Bangalore</option>
            <option value="Chennai" style={{ background: '#8b0000', color: 'white' }}>Chennai</option>
            <option value="Hyderabad" style={{ background: '#8b0000', color: 'white' }}>Hyderabad</option>
            <option value="Pune" style={{ background: '#8b0000', color: 'white' }}>Pune</option>
            <option value="Kolkata" style={{ background: '#8b0000', color: 'white' }}>Kolkata</option>
          </select>
        </div>
      )}

      {/* Hero Section - Featured Movie */}
      {shows.length > 0 && selectedLocation && (
        <div style={{
          background: 'rgba(139, 0, 0, 0.9)',
          margin: '0 1rem 3rem 1rem',
          borderRadius: '16px',
          padding: '3rem 2rem',
          position: 'relative',
          overflow: 'hidden',
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '3rem',
          minHeight: '400px',
          border: '2px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          zIndex: 10
        }}>
          <div style={{ flex: 1, zIndex: 2 }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              display: 'inline-block',
              marginBottom: '1rem',
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.9)'
            }}>
              📍 {selectedLocation}
            </div>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              {shows[0].name}
            </h1>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{
                background: 'rgba(255,255,255,0.25)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '600',
                backdropFilter: 'blur(10px)'
              }}>
                {shows[0].genre}
              </span>
              <span style={{ color: 'white', fontSize: '0.875rem' }}>
                ⏱ {shows[0].duration}
              </span>
              <span style={{ color: 'white', fontSize: '0.875rem' }}>
                💰 ${shows[0].price}
              </span>
            </div>
            <Link to={`/booking/${shows[0].id}`} style={{ textDecoration: 'none', display: 'inline-block' }}>
              <button style={{
                background: '#000000',
                color: 'white',
                border: 'none',
                padding: '1rem 2.5rem',
                borderRadius: '8px',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#333';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#000';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
              }}>
                Book Now →
              </button>
            </Link>
          </div>
          <div style={{ width: '250px', height: '350px', flexShrink: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop&q=80"
              alt={shows[0].name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop';
              }}
            />
          </div>
        </div>
      )}

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 10 }}>
        {/* Section Title */}
        {selectedLocation && (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: 'white'
            }}>
              Now Showing
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>
              Browse our latest movies and book your seats for an unforgettable cinema experience
            </p>
          </div>
        )}

        {/* Search and Filters */}
        {selectedLocation && (
          <div style={{
            background: 'rgba(139, 0, 0, 0.9)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '2px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
              <Search style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: '#666',
                pointerEvents: 'none'
              }} />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: 'white',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#e60023';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(230,0,35,0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#ddd';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                background: 'white',
                cursor: 'pointer',
                outline: 'none',
                minWidth: '150px'
              }}
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                border: '2px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                fontSize: '1rem',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                cursor: 'pointer',
                outline: 'none',
                minWidth: '150px'
              }}
            >
              <option value="date" style={{ background: '#8b0000', color: 'white' }}>Sort by Date</option>
              <option value="price-low" style={{ background: '#8b0000', color: 'white' }}>Price: Low to High</option>
              <option value="price-high" style={{ background: '#8b0000', color: 'white' }}>Price: High to Low</option>
              <option value="availability" style={{ background: '#8b0000', color: 'white' }}>Availability</option>
            </select>
          </div>
        </div>
        )}

        {/* Error Message */}
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
            <strong>Error:</strong> {error}
            <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>
              Make sure backend is running on port 4000
            </div>
          </div>
        )}

        {/* Loading State */}
        {!selectedLocation ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 0',
            background: 'rgba(139, 0, 0, 0.8)',
            borderRadius: '12px',
            border: '2px solid rgba(255,255,255,0.1)',
            color: 'white'
          }}>
            <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
              Please select your location to see available movies
            </p>
          </div>
        ) : isLoading ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem 0',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <Loader2 style={{ width: '48px', height: '48px', animation: 'spin 1s linear infinite', color: '#8b0000' }} />
            <p style={{ color: 'white' }}>Loading movies...</p>
          </div>
        ) : filteredShows.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 0',
            background: 'rgba(139, 0, 0, 0.8)',
            borderRadius: '12px',
            border: '2px solid rgba(255,255,255,0.1)',
            color: 'white'
          }}>
            <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
              {shows.length === 0 ? "No movies available. Create your first show!" : "No movies found matching your criteria"}
            </p>
            {shows.length === 0 && (
              <Link to="/admin" style={{ textDecoration: 'none', display: 'inline-block' }}>
                <button style={{
                  background: 'linear-gradient(135deg, #8b0000, #dc143c)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Create Your First Show
                </button>
              </Link>
            )}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredShows.map((show: Show) => (
              <ShowCard key={show.id} show={show} />
            ))}
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
