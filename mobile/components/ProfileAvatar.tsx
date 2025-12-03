import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Upload } from 'lucide-react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

interface ProfileAvatarProps {
    user: any;
    size?: number;
}

export default function ProfileAvatar({ user, size = 80 }: ProfileAvatarProps) {
    const [uploading, setUploading] = useState(false);
    const [photoURL, setPhotoURL] = useState(user?.photoURL || null);

    const getInitials = () => {
        if (!user?.displayName) return 'U';
        const names = user.displayName.split(' ');
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return user.displayName[0].toUpperCase();
    };

    const pickImage = async () => {
        try {
            // Request permissions
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'We need camera roll permissions to upload a photo.');
                return;
            }

            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
            });

            if (!result.canceled && result.assets[0]) {
                await uploadImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const uploadImage = async (uri: string) => {
        try {
            setUploading(true);

            // Convert URI to blob
            const response = await fetch(uri);
            const blob = await response.blob();

            // Upload to Firebase Storage
            const storage = getStorage();
            const storageRef = ref(storage, `avatars/${user.uid}/profile.jpg`);
            await uploadBytes(storageRef, blob);

            // Get download URL
            const downloadURL = await getDownloadURL(storageRef);

            // Update user profile
            await updateProfile(user, {
                photoURL: downloadURL,
            });

            setPhotoURL(downloadURL);
            Alert.alert('Success', 'Profile photo updated!');
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    return (
        <View className="items-center">
            <TouchableOpacity
                onPress={pickImage}
                disabled={uploading}
                className="relative"
            >
                {photoURL ? (
                    <Image
                        source={{ uri: photoURL }}
                        style={{ width: size, height: size }}
                        className="rounded-full"
                    />
                ) : (
                    <View
                        style={{ width: size, height: size }}
                        className="bg-spa-500 rounded-full items-center justify-center"
                    >
                        <Text className="text-white text-2xl font-bold">
                            {getInitials()}
                        </Text>
                    </View>
                )}

                {/* Upload indicator */}
                {uploading && (
                    <View
                        style={{ width: size, height: size }}
                        className="absolute inset-0 bg-black/50 rounded-full items-center justify-center"
                    >
                        <ActivityIndicator color="white" />
                    </View>
                )}

                {/* Camera icon overlay */}
                {!uploading && (
                    <View className="absolute bottom-0 right-0 bg-spa-600 rounded-full p-2">
                        <Camera color="white" size={16} />
                    </View>
                )}
            </TouchableOpacity>

            <Text className="text-zen-600 text-xs mt-2">Tap to change photo</Text>
        </View>
    );
}
