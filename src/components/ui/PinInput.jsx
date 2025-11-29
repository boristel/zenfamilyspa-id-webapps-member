import React, { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';

export function PinInput({ value, onChange, onComplete, disabled = false, error = false }) {
    const [pins, setPins] = useState(Array(6).fill(''));
    const inputRefs = useRef([]);

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        // Update parent component
        const pinValue = pins.join('');
        onChange?.(pinValue);

        // Call onComplete when all 6 digits are entered
        if (pinValue.length === 6 && onComplete) {
            onComplete(pinValue);
        }
    }, [pins, onChange, onComplete]);

    const handleChange = (index, value) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) return;

        const newPins = [...pins];
        newPins[index] = value;
        setPins(newPins);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace') {
            e.preventDefault();
            const newPins = [...pins];

            if (pins[index]) {
                // Clear current input
                newPins[index] = '';
                setPins(newPins);
            } else if (index > 0) {
                // Move to previous input and clear it
                newPins[index - 1] = '';
                setPins(newPins);
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);

        if (/^\d+$/.test(pastedData)) {
            const newPins = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
            setPins(newPins);

            // Focus last filled input or first empty
            const nextIndex = Math.min(pastedData.length, 5);
            inputRefs.current[nextIndex]?.focus();
        }
    };

    return (
        <div className="flex gap-3 justify-center">
            {pins.map((pin, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={pin}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={disabled}
                    aria-label={`PIN digit ${index + 1}`}
                    className={clsx(
                        'w-12 h-14 text-center text-2xl font-semibold rounded-xl',
                        'border-2 transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-offset-2',
                        error
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-200 bg-white focus:border-zen-green focus:ring-zen-green',
                        disabled && 'opacity-50 cursor-not-allowed',
                        pin && !error && 'border-zen-green bg-zen-sand/30'
                    )}
                />
            ))}
        </div>
    );
}
