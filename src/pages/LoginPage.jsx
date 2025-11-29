import React from 'react';
import { LoginForm } from '../features/auth/LoginForm';

export function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <LoginForm />
        </div>
    );
}
