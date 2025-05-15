import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User as UserIcon, Settings, Search, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from './ui/input';

export function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    // Navigation to /login is handled by the signOut function in AuthContext
  };

  const getInitials = (email?: string | null) => {
    if (!email) return 'U';
    const parts = email.split('@')[0].split(/[._\s-]/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-slate-900 px-6 shadow-md">
      {/* Search (optional, can be expanded) */}
      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-slate-800 pl-8 md:w-[200px] lg:w-[336px] border-slate-700 text-white focus:ring-primary"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <Button variant="ghost" size="icon" className="rounded-full text-slate-300 hover:text-white hover:bg-slate-700">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage src="/placeholder.svg" alt={user.email || 'User'} /> {/* Replace with actual user avatar if available */}
                  <AvatarFallback className="bg-slate-700 text-primary font-semibold">
                    {getInitials(user.email)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700 text-white">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Signed in as</p>
                  <p className="text-xs leading-none text-slate-400 truncate">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem onClick={() => navigate('/profile')} className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700"/>
              <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-red-500/20 focus:bg-red-500/20 focus:text-red-300 hover:text-red-300 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => navigate('/login')} className="bg-primary hover:bg-primary/90">Login</Button>
        )}
      </div>
    </header>
  );
}
