import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, 
      tabBarActiveTintColor: '#10b981',
      tabBarStyle: { backgroundColor: '#0f172a', borderTopWidth: 0 }
    }}>
      <Tabs.Screen name="index" options={{ title: 'Calculator' }} />
      <Tabs.Screen name="explore" options={{ title: 'History' }} />
    </Tabs>
  );
}