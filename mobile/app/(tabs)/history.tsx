import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function HistoryScreen() {
    return (
        <ScrollView className="flex-1 bg-zen-sand">
            <View className="px-6 pt-8">
                <Text className="text-zen-brown text-2xl font-bold mb-4">
                    Booking History
                </Text>
                <View className="bg-white rounded-2xl p-6 items-center">
                    <Text className="text-zen-600 text-center">
                        Your booking history will appear here
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
