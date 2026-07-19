import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* When user is not logged in */}
      <Stack.Screen name="(auth)" />
      {/* When user is logged in */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}