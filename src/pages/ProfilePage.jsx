import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { User } from 'lucide-react';

export function ProfilePage() {
    const { user, logout } = useAuth();

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center justify-center py-8">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-gray-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user?.name || 'User'}</h2>
                <p className="text-gray-500">{user?.email || 'email@example.com'}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                        Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                        Notifications
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                        Privacy & Security
                    </Button>
                    <Button variant="primary" className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={logout}>
                        Sign Out
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
