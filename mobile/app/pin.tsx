import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import PinInput from '../components/PinInput';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

type PinMode = 'SETUP' | 'CONFIRM' | 'VERIFY';

export default function PinScreen() {
    const { user } = useAuth();
    const router = useRouter();
    const [mode, setMode] = useState<PinMode>('VERIFY');
    const [loading, setLoading] = useState(true);
    const [setupPin, setSetupPin] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        checkPinStatus();
    }, [user]);

    const checkPinStatus = async () => {
        if (!user) {
            router.replace('/login');
            return;
        }

        try {
            const STRAPI_URL = process.env.EXPO_PUBLIC_STRAPI_URL || 'http://localhost:1337';
            const token = await user.getIdToken();

            const response = await axios.get(`${STRAPI_URL}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const hasPinSetup = response.data?.has_pin_setup || false;

            if (hasPinSetup) {
                setMode('VERIFY');
            } else {
                setMode('SETUP');
            }
        } catch (error) {
            console.error('Error checking PIN status:', error);
            setMode('SETUP'); // Default to setup if error
        } finally {
            setLoading(false);
        }
    };

    const handlePinComplete = async (pin: string) => {
        setError(false);

        if (mode === 'SETUP') {
            setSetupPin(pin);
            setMode('CONFIRM');
        } else if (mode === 'CONFIRM') {
            if (pin === setupPin) {
                await savePinToStrapi(pin);
                await SecureStore.setItemAsync('user_pin', pin);
                router.replace('/(tabs)');
            } else {
                setError(true);
                Alert.alert('Error', 'PINs do not match. Please try again.');
                setMode('SETUP');
                setSetupPin('');
            }
        } else if (mode === 'VERIFY') {
            const storedPin = await SecureStore.getItemAsync('user_pin');
            if (pin === storedPin) {
                router.replace('/(tabs)');
            } else {
                setError(true);
                Alert.alert('Error', 'Incorrect PIN. Please try again.');
            }
        }
    };

    const savePinToStrapi = async (pin: string) => {
        if (!user) return;

        try {
            const STRAPI_URL = process.env.EXPO_PUBLIC_STRAPI_URL || 'http://localhost:1337';
            const token = await user.getIdToken();

            await axios.put(
                `${STRAPI_URL}/api/users/${user.uid}`,
                { has_pin_setup: true },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error('Error saving PIN to Strapi:', error);
        }
    };

    const handleClear = () => {
        setError(false);
    };

    if (loading) {
        return (
            <View className="flex-1 bg-zen-sand items-center justify-center">
                <ActivityIndicator size="large" color="#8DA399" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-zen-sand items-center justify-center px-6">
            {/* Header */}
            <View className="items-center mb-12">
                <Text className="text-3xl font-bold text-zen-brown mb-2">
                    {mode === 'SETUP' && 'Setup Your PIN'}
                    {mode === 'CONFIRM' && 'Confirm Your PIN'}
                    {mode === 'VERIFY' && 'Enter Your PIN'}
                </Text>
                <Text className="text-zen-600 text-center">
                    {mode === 'SETUP' && 'Create a 6-digit PIN to secure your account'}
                    {mode === 'CONFIRM' && 'Re-enter your PIN to confirm'}
                    {mode === 'VERIFY' && 'Enter your PIN to continue'}
                </Text>
            </View>

            {/* PIN Input */}
            <PinInput
                onComplete={handlePinComplete}
                onClear={handleClear}
                error={error}
            />

            {/* Footer */}
            <View className="absolute bottom-12">
                <Text className="text-zen-500 text-sm">
                    Zen Family Spa
                </Text>
            </View>
        </View>
    );
}
