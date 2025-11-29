import React from 'react';
import { Button, Card } from '../ui';
import { useAuth } from '../../hooks';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
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
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.006A14.966 14.966 0 0112 14.01c-3.897 0-7.195-1.55-9.846-4.137a1.31 1.31 0 01-1.224-.934 2.346 0 013.716-1.579c2.304 2.144 3.706 4.331 4.954 5.04.048.05.09.542.169.742.455a1.367 1.367 0 001.172-1.018c-2.015-.019-3.715-.572-4.913-1.51-.6-.384-.048.014.002z"/>
                </svg>
              )}
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <Card className="h-full">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Sessions</h3>
                <p className="text-3xl font-light text-blue-600">0</p>
              </Card>

              <Card className="h-full">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Minutes</h3>
                <p className="text-3xl font-light text-purple-600">0</p>
              </Card>

              <Card className="h-full">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Streak</h3>
                <p className="text-3xl font-light text-green-600">0</p>
              </Card>
            </div>

            {/* Settings Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button variant="secondary" size="md" className="w-full">
                <span className="text-gray-700 font-medium">Edit Profile</span>
              </Button>
              <Button variant="secondary" size="md" className="w-full">
                <span className="text-gray-700 font-medium">Settings</span>
              </Button>
              <Button variant="danger" size="md" className="w-full" onClick={handleLogout}>
                <span className="font-medium">Logout</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;