import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import { storageService } from '../services/storageService'; // 👉 Nhớ đúng đường dẫn

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      // 1. Thử lấy thông tin user từ bộ nhớ
      const user = await storageService.getUser();

      // Giả lập chờ 1 giây cho chuyên nghiệp (không có cũng được)
      setTimeout(() => {
        if (user) {
          // 👉 CÓ DỮ LIỆU: Nhảy thẳng vào trong App
          router.replace('/(tabs)');
        } else {
          // 👉 KHÔNG CÓ: Bắt đầu luồng Onboarding hoặc Welcome
          router.replace('/onboarding'); 
        }
      }, 1000);
    };

    checkLoginStatus();
  }, []);

  // Hiển thị màn hình chờ trong lúc kiểm tra storage
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});