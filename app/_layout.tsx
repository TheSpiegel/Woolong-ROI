import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

// Use this specific import style
import { useColorScheme } from '@/hooks/use-color-scheme';
import { supabase } from '../lib/supabase';
import Auth from './auth';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<any>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // EXTRA DEFENSE: Check if supabase and auth exist before calling
    if (supabase && supabase.auth) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setInitialized(true);
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => {
        if (authListener) authListener.subscription.unsubscribe();
      };
    } else {
      console.error("Supabase auth is not available.");
      setInitialized(true);
    }
  }, []);

  if (!initialized) return null;

  if (!session) return <Auth />;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}