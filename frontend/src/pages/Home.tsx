import { useEffect, useState } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShowCard } from '@/components/ShowCard';
import { useBooking } from '@/contexts/BookingContext';
import { Link } from 'react-router-dom';
import type { Show } from '@/types';

const genres = ['All', 'Action', 'Sci-Fi', 'Crime', 'Drama', 'Comedy', 'Horror'];

export default function Home() {
  const { shows, fetchShows, isLoading } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchShows();
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

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Now Showing</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our latest movies and book your seats for an unforgettable cinema experience
          </p>
        </div>

        <div className="glass rounded-2xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-border/50 focus:border-primary"
              />
            </div>

            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full md:w-48 bg-muted/50 border-border/50">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent className="glass">
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-muted/50 border-border/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="glass">
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="availability">Availability</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredShows.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No shows found matching your criteria</p>
            <Button
              className="mt-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('All');
              }}
            >
              Clear Filters
            </Button>
            <div className="mt-4">
              <Link to="/admin">
                <Button className="bg-primary hover:bg-primary/90">
                  Create Your First Show
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredShows.map((show: Show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
