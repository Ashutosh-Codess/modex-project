import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Calendar, Users } from 'lucide-react';
import type { Show } from '@/types';

interface ShowCardProps {
  show: Show;
}

export function ShowCard({ show }: ShowCardProps) {
  const showDate = new Date(show.startTime);
  const formattedDate = showDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = showDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const availabilityPercentage = (show.availableSeats / show.totalSeats) * 100;
  const isSoldOut = show.availableSeats === 0;

  // Use online movie poster images
  const posterUrls = [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop',
  ];
  const posterUrl = posterUrls[show.id % posterUrls.length] || show.posterUrl;

  return (
    <div style={{
      background: 'rgba(139, 0, 0, 0.9)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      transition: 'all 0.3s',
      cursor: 'pointer',
      border: '2px solid rgba(255,255,255,0.1)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.5)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
    }}
    >
      <Link to={`/booking/${show.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden' }}>
          <img
            src={posterUrl}
            alt={show.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop';
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(139, 0, 0, 0.95)',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '600',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            {show.genre}
          </div>
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 'bold',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            ${show.price}
          </div>
        </div>

        <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {show.name}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
            <Clock style={{ width: '16px', height: '16px' }} />
            <span>{show.duration}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
            <Calendar style={{ width: '16px', height: '16px' }} />
            <span>{formattedDate} {formattedTime}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
            <MapPin style={{ width: '16px', height: '16px' }} />
            <span>{show.venue}</span>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Availability</span>
              <span style={{ fontWeight: '600', color: isSoldOut ? '#ff6b6b' : '#51cf66' }}>
                {isSoldOut ? 'Sold Out' : `${show.availableSeats} / ${show.totalSeats}`}
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${availabilityPercentage}%`,
                height: '100%',
                background: isSoldOut ? '#ff6b6b' : '#51cf66',
                transition: 'width 0.3s'
              }} />
            </div>
          </div>

          <button style={{
            width: '100%',
            padding: '0.75rem',
            background: isSoldOut ? '#555' : 'linear-gradient(135deg, #8b0000, #dc143c)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isSoldOut ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            boxShadow: isSoldOut ? 'none' : '0 4px 12px rgba(139,0,0,0.4)'
          }}
          disabled={isSoldOut}
          onMouseEnter={(e) => {
            if (!isSoldOut) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(139,0,0,0.5)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSoldOut) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,0,0,0.4)';
            }
          }}
          >
            {isSoldOut ? 'Sold Out' : 'Book Now'}
          </button>
        </div>
      </Link>
    </div>
  );
}
