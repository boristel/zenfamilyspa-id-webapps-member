import React from 'react';
import { LoginForm } from '../features/auth/LoginForm';

export function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-zen-sand via-white to-spa-50 flex items-center justify-center p-4">
            <LoginForm />
        </div>
    );
}
