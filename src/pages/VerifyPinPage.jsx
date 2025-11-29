import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PinInput } from '../components/ui/PinInput';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { hashPin } from '../lib/pinUtils';
import { strapiService } from '../services/strapi';
import { Unlock, AlertCircle } from 'lucide-react';

export function VerifyPinPage() {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const { user, profile, logout } = useAuth();
    const navigate = useNavigate();

    const handlePinComplete = async (enteredPin) => {
        setLoading(true);
        setError('');

        try {
            const pinHash = await hashPin(enteredPin);
            const isValid = await strapiService.verifyPin(profile.id, pinHash);

            if (isValid) {
                // Set session flag
                sessionStorage.setItem('pin_verified', 'true');
                // Redirect to dashboard
                navigate('/', { replace: true });
            } else {
                const newAttempts = attempts + 1;
                setAttempts(newAttempts);

                if (newAttempts >= 3) {
                    setError('Too many failed attempts. Please sign in again.');
                    setTimeout(() => {
                        logout();
                    }, 2000);
                } else {
                    setError(`Incorrect PIN. ${3 - newAttempts} attempts remaining.`);
                    setPin('');
                }
            }
        } catch (err) {
            console.error('Error verifying PIN:', err);
            setError('Failed to verify PIN. Please try again.');
            setPin('');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPin = async () => {
        if (window.confirm('Reset your PIN? You will need to set up a new one.')) {
            try {
                // Reset PIN in Strapi
                await strapiService.updateUserPin(profile.id, null);
                await strapiService.getUserProfile(profile.id);
                navigate('/setup-pin', { replace: true });
            } catch (err) {
                console.error('Error resetting PIN:', err);
                setError('Failed to reset PIN. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zen-sand via-white to-spa-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-16 h-16 bg-zen-green/10 rounded-full flex items-center justify-center mb-4">
                        <Unlock className="w-8 h-8 text-zen-green" />
                    </div>
                    <CardTitle className="text-2xl text-zen-brown">
                        Welcome back, {user?.name || 'User'}
                    </CardTitle>
                    <CardDescription className="text-zen-brown/70">
                        Enter your PIN to unlock
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center flex items-center justify-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <div className="py-4">
                        <PinInput
                            value={pin}
                            onChange={setPin}
                            onComplete={handlePinComplete}
                            disabled={loading || attempts >= 3}
                            error={!!error}
                        />
                    </div>

                    <div className="text-center">
                        <button
                            onClick={handleForgotPin}
                            className="text-sm text-zen-green hover:text-zen-green/80 underline transition-colors"
                            disabled={loading}
                        >
                            Forgot PIN?
                        </button>
                    </div>

                    <div className="text-center text-xs text-zen-brown/50">
                        <p>Your PIN keeps your account secure</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
