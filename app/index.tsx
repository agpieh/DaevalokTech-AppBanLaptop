import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Tự động chuyển sang trang onboarding sau 2.5 giây
    const timer = setTimeout(() => {
      router.replace('/onboarding'); // Dùng replace để người dùng không bấm Back lại màn hình Splash được
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Cập nhật tên file logo của bạn vào đây */}
      <Image 
        source={require('../assets/images/Group 1.png')} 
        style={styles.logo} 
        resizeMode="contain" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary, // Màu xanh chủ đạo
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Tự tinh chỉnh độ to nhỏ của logo
    height: 60,
  },
});