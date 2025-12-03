import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Calendar, Clock } from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScrollView className="flex-1 bg-zen-sand">
      {/* Header */}
      <View className="px-6 pt-8 pb-6">
        <Text className="text-zen-600 text-sm">Welcome back,</Text>
        <Text className="text-zen-brown text-3xl font-bold mt-1">
          {user?.displayName || 'Guest'}
        </Text>
      </View>

      {/* Quick Actions */}
      <View className="px-6 mb-6">
        <Text className="text-zen-brown text-lg font-semibold mb-4">
          Quick Actions
        </Text>
        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-1 bg-spa-500 rounded-2xl p-4 items-center">
            <Calendar color="white" size={32} />
            <Text className="text-white font-semibold mt-2">Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-lavender-500 rounded-2xl p-4 items-center">
            <Clock color="white" size={32} />
            <Text className="text-white font-semibold mt-2">My Bookings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Services */}
      <View className="px-6 mb-6">
        <Text className="text-zen-brown text-lg font-semibold mb-4">
          Our Services
        </Text>
        <View className="gap-3">
          <ServiceCard
            title="Massage Therapy"
            description="Relax and rejuvenate with our signature massages"
            icon={<Sparkles color="#8DA399" size={24} />}
          />
          <ServiceCard
            title="Facial Treatment"
            description="Refresh your skin with our premium facials"
            icon={<Sparkles color="#8DA399" size={24} />}
          />
          <ServiceCard
            title="Body Spa"
            description="Complete body treatment for ultimate relaxation"
            icon={<Sparkles color="#8DA399" size={24} />}
          />
        </View>
      </View>
    </ScrollView>
  );
}

function ServiceCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm">
      <View className="w-12 h-12 bg-spa-100 rounded-full items-center justify-center mr-4">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-zen-brown font-semibold text-base">{title}</Text>
        <Text className="text-zen-600 text-sm mt-1">{description}</Text>
      </View>
    </TouchableOpacity>
  );
}
