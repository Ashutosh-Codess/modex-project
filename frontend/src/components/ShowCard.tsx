import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Calendar, Users } from 'lucide-react';
import type { Show } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
  const isLowAvailability = availabilityPercentage < 30;
  const isSoldOut = show.availableSeats === 0;

  return (
    <div className="group glass glass-hover rounded-2xl overflow-hidden">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={show.posterUrl}
          alt={show.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
          {show.genre}
        </Badge>
        
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-lg font-bold text-gradient">${show.price}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
            {show.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{show.duration}</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{formattedDate}</span>
          </div>
          <span className="font-medium text-foreground">{formattedTime}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{show.venue}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>Availability</span>
            </div>
            <span className={cn(
              'font-medium',
              isSoldOut ? 'text-destructive' : isLowAvailability ? 'text-yellow-500' : 'text-green-500'
            )}>
              {isSoldOut ? 'Sold Out' : `${show.availableSeats} / ${show.totalSeats}`}
            </span>
          </div>
          
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-300',
                isSoldOut ? 'bg-destructive' : isLowAvailability ? 'bg-yellow-500' : 'bg-green-500'
              )}
              style={{ width: `${availabilityPercentage}%` }}
            />
          </div>
        </div>

        <Link to={`/booking/${show.id}`} className="block">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            disabled={isSoldOut}
          >
            {isSoldOut ? 'Sold Out' : 'Book Now'}
          </Button>
        </Link>
      </div>
    </div>
  );
}

