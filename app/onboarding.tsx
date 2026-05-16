import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={require('../assets/images/logo/HD-wallpaper-gaming-setup-magenta-computer-gamingsetup-light-neon-night-pcsetup-desksetup.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          
          {/* PHẦN 1: Cụm Logo & Chữ (Tự động nằm giữa khoảng trống) */}
          <View style={styles.mainContent}>
            <Text style={styles.title}>
              Chào mừng đến với
            </Text>
            
            <Image 
              source={require('../assets/images/logo/logo-light-transparent.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
            
            <Text style={styles.subtitle}>
              Khám phá thế giới công nghệ đỉnh cao.{'\n'}Laptop, PC & Phụ kiện chính hãng.
            </Text>
          </View>

          {/* PHẦN 2: Nút bấm (Luôn bị đẩy xuống sát đáy) */}
          <View style={styles.bottomSection}>
            <TouchableOpacity 
              style={styles.button} 
              activeOpacity={0.8}
              onPress={() => router.push('/login' as any)}
            >
              <Text style={styles.buttonText}>Bắt đầu khám phá</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }, 
  container: { flex: 1 },
  
  // 👉 Khung chứa Logo và Chữ: flex: 1 giúp nó chiếm toàn bộ khoảng trống phía trên nút bấm
  mainContent: { 
    flex: 1, 
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center',     // Căn giữa theo chiều ngang
    paddingHorizontal: 30 
  },
  
  // 👉 Khung chứa Nút bấm: neo chặt ở dưới cùng, cách đáy 40px
  bottomSection: {
    paddingHorizontal: 30,
    paddingBottom: 40, 
  },
  
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: 'white', 
    textAlign: 'center', 
    marginBottom: 5 
  },
  
  logo: { 
    width: 240, 
    height: 240, 
    marginBottom: 5, 
  },
  
  subtitle: { 
    fontSize: 16, 
    color: 'rgba(255,255,255,0.8)', 
    textAlign: 'center', 
    lineHeight: 24 
  },
  
  button: { 
    backgroundColor: Colors.primary, 
    width: '100%', 
    paddingVertical: 18, 
    borderRadius: 15, 
    alignItems: 'center' 
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});