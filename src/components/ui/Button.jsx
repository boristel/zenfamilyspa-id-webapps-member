import React from 'react';
import { clsx } from 'clsx';

export function Button({ className, variant = 'primary', size = 'default', children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md focus:ring-blue-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    outline: "border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-900 focus:ring-gray-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-900 focus:ring-gray-500",
  };

  const sizes = {
    default: "h-10 px-4 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}