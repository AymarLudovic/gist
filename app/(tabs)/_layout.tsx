// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Home, Search, PlusSquare, MessageSquare, User } from 'lucide-react-native'; // Icons for tabs
import { Colors } from '@/constants/Colors';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.tint,
        tabBarInactiveTintColor: Colors.dark.tabIconDefault,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.dark.background,
          borderTopWidth: 0,
          elevation: 0, // Remove shadow on Android
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0, // Adjust for iPhone notch
          height: Platform.OS === 'ios' ? 50 + insets.bottom : 60, // Standard height + safe area
        },
        tabBarShowLabel: false, // Don't show text labels
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <Home size={28} color={color} fill={focused ? color : 'none'} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Découvrir',
          tabBarIcon: ({ color, focused }) => (
            <Search size={28} color={color} fill={focused ? color : 'none'} />
          ),
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color }) => (
            <PlusSquare size={36} color={Colors.dark.text} /> // Larger, distinct icon for upload
          ),
          tabBarItemStyle: styles.uploadTabItem, // Custom style for the central tab
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Boîte de réception',
          tabBarIcon: ({ color, focused }) => (
            <MessageSquare size={28} color={color} fill={focused ? color : 'none'} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <User size={28} color={color} fill={focused ? color : 'none'} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  uploadTabItem: {
    // This is often styled to be a prominent button in the middle
    justifyContent: 'center',
    alignItems: 'center',
    // Example: A background circle for the + button
    // backgroundColor: Colors.primary,
    // borderRadius: 25,
    // width: 50,
    // height: 50,
    // top: -10, // Lift it slightly above the tab bar
  },
});