import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* --- DÀN MÀN HÌNH CŨ CỦA BẠN --- */}
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="phone" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="location" />

      {/* --- DÀN MÀN HÌNH MỚI BỔ SUNG --- */}
      
      {/* 1. Nhóm Tab chính (Home, Cart, Explore, Favorite, Account) */}
      <Stack.Screen name="(tabs)" />

      {/* 2. Chi tiết sản phẩm */}
      <Stack.Screen name="product-detail" />

      {/* 3. Màn hình Checkout (Thiết lập dạng Modal trượt lên giống TikTok) */}
      <Stack.Screen 
        name="checkout" 
        options={{ 
          presentation: 'transparentModal', 
          animation: 'slide_from_bottom' 
        }} 
      />

      {/* 4. Các màn hình thông báo kết quả */}
      <Stack.Screen name="order-accepted" />
      <Stack.Screen name="order-error" />
    </Stack>
  );
}