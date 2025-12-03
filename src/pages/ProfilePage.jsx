import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { QRCodeSVG } from 'qrcode.react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

export function ProfilePage() {
    const { user, logout } = useAuth();
    const [uploading, setUploading] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const fileInputRef = useRef(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);

            // Upload to Firebase Storage
            const storage = getStorage();
            const storageRef = ref(storage, `avatars/${user.uid}/profile.jpg`);
            await uploadBytes(storageRef, file);

            // Get download URL
            const downloadURL = await getDownloadURL(storageRef);

            // Update user profile
            await updateProfile(user, {
                photoURL: downloadURL,
            });

            // Force reload to show new avatar
            window.location.reload();
        } catch (error) {
            console.error('Error uploading avatar:', error);
            alert('Failed to upload avatar');
        } finally {
            setUploading(false);
        }
    };

    const getInitials = () => {
        if (!user?.displayName) return 'U';
        const names = user.displayName.split(' ');
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return user.displayName[0].toUpperCase();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center justify-center py-8">
                {/* Avatar with upload */}
                <div className="relative mb-4">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div
                        onClick={handleAvatarClick}
                        className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity relative"
                    >
                        {uploading && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            </div>
                        )}
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <span className="text-2xl font-bold text-white">{getInitials()}</span>
                        )}
                        {!uploading && (
                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md">
                                <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">Click to change photo</p>
                </div>

                <h2 className="text-xl font-bold text-gray-900">{user?.displayName || 'User'}</h2>
                <p className="text-gray-500">{user?.email || 'email@example.com'}</p>
            </div>

            {/* QR Code Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Member QR Code</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                    <div
                        onClick={() => setShowQRModal(true)}
                        className="bg-white p-4 rounded-xl inline-block cursor-pointer hover:shadow-lg transition-shadow"
                    >
                        <QRCodeSVG
                            value={user?.uid || 'no-uid'}
                            size={150}
                            level="H"
                            includeMargin={true}
                        />
                    </div>
                    <p className="text-sm text-gray-600">Click to enlarge for scanning</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="primary" className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={logout}>
                        Sign Out
                    </Button>
                </CardContent>
            </Card>

            {/* QR Code Modal */}
            {showQRModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowQRModal(false)}
                >
                    <div
                        className="bg-white rounded-3xl p-8 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800">Member QR Code</h2>
                            {user?.displayName && (
                                <p className="text-gray-600">{user.displayName}</p>
                            )}
                            <div className="bg-white p-6 rounded-2xl inline-block shadow-lg">
                                <QRCodeSVG
                                    value={user?.uid || 'no-uid'}
                                    size={280}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>
                            <p className="text-sm text-gray-600">
                                Show this QR code to spa staff for check-in
                            </p>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setShowQRModal(false)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
