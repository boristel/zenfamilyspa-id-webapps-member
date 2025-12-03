import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { LogOut, QrCode } from 'lucide-react-native';
import ProfileAvatar from '../../components/ProfileAvatar';
import QRCodeModal from '../../components/QRCodeModal';
import QRCode from 'react-native-qrcode-svg';

export default function ProfileScreen() {
    const { user, signOut } = useAuth();
    const [qrModalVisible, setQrModalVisible] = useState(false);

    const handleSignOut = async () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: async () => {
                        await signOut();
                    },
                },
            ]
        );
    };

    return (
        <ScrollView className="flex-1 bg-zen-sand">
            <View className="px-6 pt-8">
                {/* Profile Header with Avatar */}
                <View className="bg-white rounded-2xl p-6 items-center mb-6">
                    <ProfileAvatar user={user} size={100} />

                    <Text className="text-zen-brown text-xl font-bold mt-4">
                        {user?.displayName || 'Guest'}
                    </Text>
                    <Text className="text-zen-600 text-sm mt-1">
                        {user?.email}
                    </Text>
                </View>

                {/* QR Code Section */}
                <View className="bg-white rounded-2xl p-6 items-center mb-6">
                    <View className="flex-row items-center mb-4">
                        <QrCode color="#2D3748" size={20} />
                        <Text className="text-zen-brown text-lg font-semibold ml-2">
                            Member QR Code
                        </Text>
                    </View>

                    {/* Small QR Code Preview */}
                    <TouchableOpacity
                        onPress={() => setQrModalVisible(true)}
                        className="bg-white p-4 rounded-xl"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <QRCode
                            value={user?.uid || 'no-uid'}
                            size={150}
                            backgroundColor="white"
                            color="#2D3748"
                        />
                    </TouchableOpacity>

                    <Text className="text-zen-600 text-sm mt-4 text-center">
                        Tap to enlarge for scanning
                    </Text>
                </View>

                {/* Sign Out Button */}
                <TouchableOpacity
                    onPress={handleSignOut}
                    className="bg-red-500 rounded-2xl p-4 flex-row items-center justify-center"
                >
                    <LogOut color="white" size={20} />
                    <Text className="text-white font-semibold ml-2">Sign Out</Text>
                </TouchableOpacity>
            </View>

            {/* QR Code Full Screen Modal */}
            <QRCodeModal
                visible={qrModalVisible}
                onClose={() => setQrModalVisible(false)}
                uid={user?.uid || 'no-uid'}
                userName={user?.displayName || undefined}
            />
        </ScrollView>
    );
}
