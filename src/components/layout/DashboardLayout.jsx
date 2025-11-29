import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />
      <main className="mx-auto max-w-md px-4 pt-4 pb-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}