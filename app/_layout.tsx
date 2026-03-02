import 'react-native-get-random-values';
import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { useOnboarding } from '@/hooks/useOnboarding';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const { isLoading, hasCompletedOnboarding } = useOnboarding();

  useEffect(() => {
    if (isLoading) return;
    if (!hasCompletedOnboarding) {
      router.replace('/onboarding');
    } else {
      router.replace('/(app)');
    }
  }, [isLoading, hasCompletedOnboarding]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding/index" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
}
