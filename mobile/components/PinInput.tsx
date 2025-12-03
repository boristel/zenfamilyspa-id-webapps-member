import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

interface PinInputProps {
    length?: number;
    onComplete: (pin: string) => void;
    onClear?: () => void;
    error?: boolean;
}

export default function PinInput({
    length = 6,
    onComplete,
    onClear,
    error = false
}: PinInputProps) {
    const [pin, setPin] = useState('');
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        // Auto-focus on mount
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (pin.length === length) {
            onComplete(pin);
        }
    }, [pin, length, onComplete]);

    const handlePress = () => {
        inputRef.current?.focus();
    };

    const handleClear = () => {
        setPin('');
        onClear?.();
        inputRef.current?.focus();
    };

    return (
        <View className="items-center">
            {/* Hidden TextInput */}
            <TextInput
                ref={inputRef}
                value={pin}
                onChangeText={setPin}
                keyboardType="number-pad"
                maxLength={length}
                className="absolute opacity-0"
                autoFocus
            />

            {/* Visual PIN boxes */}
            <TouchableOpacity
                onPress={handlePress}
                activeOpacity={0.7}
                className="flex-row gap-3"
            >
                {Array.from({ length }).map((_, index) => (
                    <View
                        key={index}
                        className={`w-14 h-16 rounded-xl border-2 items-center justify-center ${error
                                ? 'border-red-500 bg-red-50'
                                : pin.length > index
                                    ? 'border-spa-600 bg-spa-50'
                                    : 'border-zen-300 bg-white'
                            }`}
                    >
                        {pin.length > index && (
                            <View className="w-3 h-3 rounded-full bg-zen-brown" />
                        )}
                    </View>
                ))}
            </TouchableOpacity>

            {/* Clear button */}
            {pin.length > 0 && (
                <TouchableOpacity
                    onPress={handleClear}
                    className="mt-6 px-6 py-3 bg-zen-200 rounded-full"
                >
                    <Text className="text-zen-brown font-semibold">Clear</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
