import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="players" options={{ headerShown: false }} />
        <Stack.Screen 
          name="never_have_I_ever/index" 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="never_have_I_ever/starter" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="never_have_I_ever/spicy" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="never_have_I_ever/extreme" 
          options={{ headerShown: false }} 
        />
          <Stack.Screen 
            name="truth_or_dare/index" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="truth_or_dare/starter" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="truth_or_dare/spicy" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="truth_or_dare/extreme" 
            options={{ headerShown: false }} 
            />
        <Stack.Screen 
          name="party_mode/index" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="most_likely_to/index" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="most_likely_to/starter" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="most_likely_to/spicy" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="most_likely_to/extreme" 
          options={{ headerShown: false }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
