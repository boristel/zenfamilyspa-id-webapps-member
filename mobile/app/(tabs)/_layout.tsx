import React from 'react';
import { Tabs } from 'expo-router';
import { Home, History, User } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';

export default function TabLayout() {
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8DA399', // zen-green
        tabBarInactiveTintColor: '#9c8b7d', // zen-600
        tabBarStyle: {
          backgroundColor: '#F5F5F1', // zen-sand
          borderTopColor: '#e8ddd0', // zen-300
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: '#F5F5F1',
        },
        headerTintColor: '#5D4037', // zen-brown
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <History color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
