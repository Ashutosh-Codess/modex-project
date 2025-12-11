import React, { useState, useEffect } from 'react';
import { 
  Film, 
  Ticket, 
  DollarSign, 
  Users, 
  Plus, 
  Trash2, 
  Edit, 
  Loader2,
  Calendar,
  Clock,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { StatsCard } from '@/components/StatsCard';
import { useBooking } from '@/contexts/BookingContext';
import { useToast } from '@/hooks/use-toast';

const genres = ['Action', 'Sci-Fi', 'Crime', 'Drama', 'Comedy', 'Horror', 'Romance', 'Thriller'];
const venues = ['Screen 1', 'Screen 2', 'Screen 3', 'IMAX', 'VIP Lounge'];

export default function Admin() {
  const { shows, fetchShows, createShow, deleteShow, isLoading } = useBooking();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    totalSeats: 100,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (formData.totalSeats < 1) newErrors.totalSeats = 'Must have at least 1 seat';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await createShow({
        name: formData.name,
        startTime: formData.startTime,
        totalSeats: formData.totalSeats,
        price: 12.99,
        venue: venues[0],
        genre: genres[0],
        duration: '2h 0m',
        posterUrl: '/placeholder.svg',
      });
      toast({
        title: 'Show created!',
        description: `"${formData.name}" has been added successfully.`,
      });
      setIsDialogOpen(false);
      setFormData({
        name: '',
        startTime: '',
        totalSeats: 100,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.response?.data?.error || 'Failed to create show. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: number, name: string) => {
    try {
      await deleteShow(id);
      toast({
        title: 'Show deleted',
        description: `"${name}" has been removed.`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to delete show.',
        variant: 'destructive',
      });
    }
  };

  const totalRevenue = shows.reduce((sum, show) => {
    const bookedSeats = show.totalSeats - show.availableSeats;
    return sum + (bookedSeats * show.price);
  }, 0);

  const totalBookings = shows.reduce((sum, show) => {
    return sum + (show.totalSeats - show.availableSeats);
  }, 0);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage shows, bookings, and analytics</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-5 h-5 mr-2" />
                Add New Show
              </Button>
            </DialogTrigger>
            <DialogContent className="glass max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-gradient">Create New Show</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Show Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter show name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`bg-muted/50 ${errors.name ? 'border-destructive' : ''}`}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="totalSeats">Total Seats</Label>
                    <Input
                      id="totalSeats"
                      type="number"
                      min="1"
                      value={formData.totalSeats}
                      onChange={(e) => setFormData({ ...formData, totalSeats: parseInt(e.target.value) || 0 })}
                      className={`bg-muted/50 ${errors.totalSeats ? 'border-destructive' : ''}`}
                    />
                    {errors.totalSeats && <p className="text-sm text-destructive">{errors.totalSeats}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className={`bg-muted/50 ${errors.startTime ? 'border-destructive' : ''}`}
                  />
                  {errors.startTime && <p className="text-sm text-destructive">{errors.startTime}</p>}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Show'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Shows"
            value={shows.length}
            icon={Film}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Total Bookings"
            value={totalBookings}
            icon={Ticket}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
            icon={DollarSign}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Active Users"
            value="1,234"
            icon={Users}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <h2 className="text-xl font-semibold">All Shows</h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead>Show</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shows.map((show) => {
                  const showDate = new Date(show.startTime);
                  return (
                    <TableRow key={show.id} className="border-border/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{show.name}</p>
                            <p className="text-sm text-muted-foreground">{show.duration}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="w-4 h-4 text-primary" />
                            {showDate.toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {showDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{show.availableSeats} / {show.totalSeats}</p>
                          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(show.availableSeats / show.totalSeats) * 100}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-destructive/20 text-destructive"
                            onClick={() => handleDelete(show.id, show.name)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
