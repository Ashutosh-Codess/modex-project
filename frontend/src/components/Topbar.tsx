import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, User, LogOut, Settings, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export function Topbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Shows', icon: Film },
    { path: '/my-bookings', label: 'My Bookings', icon: Ticket },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 bg-white/95 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Film className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-gradient">CineBook</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
                  location.pathname === link.path
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
                  location.pathname === '/admin'
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Settings className="w-4 h-4" />
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="hidden md:inline text-sm">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 glass">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Ticket className="w-4 h-4" />
                    My Bookings
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-destructive">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
