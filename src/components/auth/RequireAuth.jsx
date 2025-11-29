import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function RequireAuth({ children }) {
    const { user, profile, loading } = useAuth();

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-zen-sand via-white to-spa-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-zen-green border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-zen-brown/70">Loading...</p>
                </div>
            </div>
        );
    }

    // User exists but profile not yet synced → show loading
    if (user && !profile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-zen-sand via-white to-spa-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-zen-green border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-zen-brown/70">Syncing profile...</p>
                </div>
            </div>
        );
    }

    // Not logged in → redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but no PIN setup → redirect to setup
    console.log('RequireAuth - Checking PIN setup. Profile:', profile);
    console.log('RequireAuth - has_pin_setup value:', profile?.has_pin_setup);
    if (!profile?.has_pin_setup) {
        console.log('RequireAuth - Redirecting to /setup-pin because has_pin_setup is', profile?.has_pin_setup);
        return <Navigate to="/setup-pin" replace />;
    }

    // Has PIN but not verified this session → redirect to verify
    const sessionUnlocked = sessionStorage.getItem('pin_verified');
    if (!sessionUnlocked) {
        return <Navigate to="/verify-pin" replace />;
    }

    // All checks passed → render protected content
    return children;
}
