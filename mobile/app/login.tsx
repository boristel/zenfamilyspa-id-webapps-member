import React from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { Mail } from 'lucide-react-native';

export default function LoginScreen() {
    const { signInWithGoogle, loading } = useAuth();
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
        // Navigation will be handled by auth state listener
    };

    if (loading) {
        return (
            <View className="flex-1 bg-zen-sand items-center justify-center">
                <ActivityIndicator size="large" color="#8DA399" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-zen-sand">
            {/* Background Gradient Effect */}
            <View className="absolute inset-0 bg-gradient-to-b from-spa-100 to-zen-sand" />

            {/* Content */}
            <View className="flex-1 items-center justify-center px-6">
                {/* Logo/Brand */}
                <View className="items-center mb-12">
                    <View className="w-24 h-24 rounded-full bg-spa-500 items-center justify-center mb-4">
                        <Text className="text-4xl text-white">禅</Text>
                    </View>
                    <Text className="text-4xl font-bold text-zen-brown mb-2">
                        Zen Family Spa
                    </Text>
                    <Text className="text-zen-600 text-center">
                        Find your inner peace
                    </Text>
                </View>

                {/* Sign In Buttons */}
                <View className="w-full max-w-sm">
                    {/* Google Sign In */}
                    <TouchableOpacity
                        onPress={handleGoogleSignIn}
                        className="bg-white rounded-2xl px-6 py-4 flex-row items-center justify-center shadow-lg mb-4"
                        activeOpacity={0.8}
                    >
                        <Image
                            source={{ uri: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' }}
                            className="w-6 h-6 mr-3"
                        />
                        <Text className="text-zen-brown font-semibold text-base">
                            Continue with Google
                        </Text>
                    </TouchableOpacity>

                    {/* Email Sign In (Placeholder) */}
                    <TouchableOpacity
                        onPress={() => {
                            // TODO: Implement email/password sign in
                        }}
                        className="bg-spa-500 rounded-2xl px-6 py-4 flex-row items-center justify-center shadow-lg"
                        activeOpacity={0.8}
                    >
                        <Mail color="white" size={20} className="mr-3" />
                        <Text className="text-white font-semibold text-base">
                            Continue with Email
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Terms */}
                <View className="absolute bottom-12">
                    <Text className="text-zen-500 text-xs text-center">
                        By continuing, you agree to our{'\n'}
                        <Text className="text-spa-600">Terms of Service</Text> and{' '}
                        <Text className="text-spa-600">Privacy Policy</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}
