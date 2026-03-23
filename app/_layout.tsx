import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // headerShown: false giúp ẩn thanh tiêu đề gạch xám mặc định ở tất cả các trang
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="phone" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="location" />
    </Stack>
  );
}