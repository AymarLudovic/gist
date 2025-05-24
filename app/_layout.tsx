// app/_layout.tsx
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { AuthProvider } from '@/components/AuthContext';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    InterRegular: require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
    InterMedium: require('@expo-google-fonts/inter/Inter_500Medium.ttf'),
    InterSemiBold: require('@expo-google-fonts/inter/Inter_600SemiBold.ttf'),
    InterBold: require('@expo-google-fonts/inter/Inter_700Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // The AuthProvider manages the global authentication state.
  // The initial route based on authentication status would typically be handled here.
  // For this TikTok clone, we'll directly show the tabs, assuming a logged-in user.
  // In a real app, you'd have an (auth) group for sign-in/sign-up.
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <ThemeProvider value={DarkTheme}> {/* Forcing dark theme for TikTok feel */}
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.dark.background } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* Example for future authentication flow, uncomment and implement when needed */}
          {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}