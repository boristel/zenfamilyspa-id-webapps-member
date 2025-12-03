import React, { useState, useRef } from 'react';
import { Button, Card } from '../ui';
import { useAuth } from '../../hooks';
import { QRCodeSVG } from 'qrcode.react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-md mx-auto">
        <Card className="h-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-gray-800 mb-4">Profile</h1>
            <p className="text-gray-600 text-lg">Manage your Zen experience</p>
          </div>

          <div className="flex flex-col items-center space-y-6">
            {/* Profile Picture */}
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onClick={handleAvatarClick}
                className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:opacity-90 transition-opacity relative"
              >
                {uploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">{getInitials()}</span>
                )}
                {!uploading && (
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Tap to change photo</p>
            </div>

            {/* User Info */}
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-medium text-gray-800">
                {user?.displayName || 'Zen User'}
              </h2>
              <p className="text-gray-600">{user?.email || 'No email available'}</p>

              {user?.metadata?.creationTime && (
                <p className="text-sm text-gray-500">
                  Member since {new Date(user.metadata.creationTime).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* QR Code Section */}
            <Card className="w-full">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Member QR Code</h3>
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
                <p className="text-sm text-gray-600">Tap to enlarge for scanning</p>
              </div>
            </Card>

            {/* Settings Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button variant="danger" size="md" className="w-full" onClick={handleLogout}>
                <span className="font-medium">Logout</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>

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
                variant="secondary"
                size="md"
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
};

export default ProfilePage;