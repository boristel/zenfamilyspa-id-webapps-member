import React from 'react';
import { Home, History, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

export function Footer() {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: History, label: 'History', path: '/history' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white pb-safe">
      <div className="grid h-16 grid-cols-3">
        {navItems.map(({ icon, label, path }) => {
          const IconComponent = icon;
          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                clsx(
                  "flex flex-col items-center justify-center gap-1 transition-colors",
                  isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                )
              }
            >
              <IconComponent className="h-6 w-6" />
              <span className="text-[10px] font-medium">{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}