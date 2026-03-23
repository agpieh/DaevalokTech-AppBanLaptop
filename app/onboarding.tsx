import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    // Cập nhật tên file ảnh nền anh giao hàng vào đây
    <ImageBackground 
      source={require('../assets/images/8140 1.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      {/* Lớp phủ đen mờ nếu ảnh hơi sáng, giúp chữ nổi bật hơn (tùy chọn) */}
      <View style={styles.overlay}>
        <SafeAreaView style={styles.contentContainer}>
          
          <View style={styles.textContainer}>
            {/* Tùy chọn: Thêm icon củ cà rốt trắng nhỏ ở đây nếu Figma có */}
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.title}>to our store</Text>
            <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>
          </View>

          {/* Nút bấm Get Started */}
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/welcome')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)', // Có thể chỉnh độ mờ ở đây
    justifyContent: 'flex-end', // Đẩy mọi thứ xuống đáy
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 30,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)', // Màu trắng hơi trong suốt
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});