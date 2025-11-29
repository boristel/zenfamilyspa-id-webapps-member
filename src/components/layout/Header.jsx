import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-bold text-gray-900">ZenApps</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">
            {user?.name || 'User'}
          </span>
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <User className="h-4 w-4 text-gray-600" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}