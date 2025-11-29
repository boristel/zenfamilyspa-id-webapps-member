import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PinInput } from '../components/ui/PinInput';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { hashPin, isValidPin } from '../lib/pinUtils';
import { strapiService } from '../services/strapi';
import { Lock, ShieldCheck } from 'lucide-react';

export function SetupPinPage() {
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [step, setStep] = useState(1); // 1: enter PIN, 2: confirm PIN
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { profile, updateProfile, error: authError, syncWithStrapi, user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    // Redirect if not authenticated
    React.useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [authLoading, user, navigate]);

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zen-green"></div>
            </div>
        );
    }

    const handlePinComplete = async (enteredPin) => {
        if (step === 1) {
            // First PIN entry
            if (!isValidPin(enteredPin)) {
                setError('PIN must be 6 digits');
                return;
            }
            setPin(enteredPin);
            setStep(2);
            setError('');
        } else {
            // Confirm PIN
            if (enteredPin !== pin) {
                setError('PINs do not match. Please try again.');
                setConfirmPin('');
                setTimeout(() => {
                    setStep(1);
                    setPin('');
                    setError('');
                }, 2000);
                return;
            }

            // Save PIN to Strapi
            setLoading(true);
            try {
                const pinHash = await hashPin(enteredPin);
                await strapiService.updateUserPin(profile.id, pinHash);
                await updateProfile({ has_pin_setup: true });

                // Redirect to verify PIN
                navigate('/verify-pin', { replace: true });
            } catch (err) {
                console.error('Error setting up PIN:', err);
                setError('Failed to set up PIN. Please try again.');
                setLoading(false);
            }
        }
    };

    const handleBack = () => {
        setStep(1);
        setPin('');
        setConfirmPin('');
        setError('');
    };

    if (authError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="text-red-500 text-xl font-bold mb-4">Authentication Error</div>
                    <p className="text-gray-600 mb-6">{authError}</p>
                    <button
                        onClick={() => syncWithStrapi(user)}
                        className="bg-zen-green text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        Retry Sync
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-zen-sand via-white to-spa-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-16 h-16 bg-zen-green/10 rounded-full flex items-center justify-center mb-4">
                        {step === 1 ? (
                            <Lock className="w-8 h-8 text-zen-green" />
                        ) : (
                            <ShieldCheck className="w-8 h-8 text-zen-green" />
                        )}
                    </div>
                    <CardTitle className="text-2xl text-zen-brown">
                        {step === 1 ? 'Create Your Security PIN' : 'Confirm Your PIN'}
                    </CardTitle>
                    <CardDescription className="text-zen-brown/70">
                        {step === 1
                            ? 'Enter a 6-digit PIN to secure your account'
                            : 'Re-enter your PIN to confirm'}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="py-4">
                        <PinInput
                            value={step === 1 ? pin : confirmPin}
                            onChange={step === 1 ? setPin : setConfirmPin}
                            onComplete={handlePinComplete}
                            disabled={loading}
                            error={!!error}
                        />
                    </div>

                    {step === 2 && (
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleBack}
                            disabled={loading}
                        >
                            Back
                        </Button>
                    )}

                    <div className="text-center text-sm text-zen-brown/60">
                        <p>Your PIN will be used to unlock the app</p>
                        <p className="mt-1">Keep it safe and don't share it</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
