import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Ảnh banner hoa quả */}
      <Image 
        source={require('../assets/images/Mask Group-1.png')} 
        style={styles.banner} 
        resizeMode="cover" 
      />

      <View style={styles.content}>
        <Text style={styles.title}>Get your groceries{'\n'}with nectar</Text>

        {/* Ô nhập số điện thoại */}
        <TouchableOpacity style={styles.phoneInputBox} onPress={() => router.push('/phone')} activeOpacity={0.7}>
          {/* Cứ điền tên file ảnh cờ mới của bạn vào đây */}
          <Image 
            source={require('../assets/images/vietnam.png')} 
            style={styles.flagIcon} 
            resizeMode="contain" 
          />
          <Text style={styles.phonePrefix}>+84</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>Or connect with social media</Text>
        </View>

        {/* Nút Google (Giờ chỉ là 1 cái ảnh bấm được) */}
        <TouchableOpacity activeOpacity={0.8} style={styles.socialBtnWrapper}>
          <Image 
            source={require('../assets/images/google.png')} 
            style={styles.socialImage} 
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Nút Facebook (Giờ chỉ là 1 cái ảnh bấm được) */}
        <TouchableOpacity activeOpacity={0.8} style={styles.socialBtnWrapper}>
          <Image 
            source={require('../assets/images/facebook.png')} 
            style={styles.socialImage} 
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  banner: { width: '100%', height: 350 }, 
  content: { flex: 1, paddingHorizontal: 25, paddingTop: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: Colors.textDark, marginBottom: 30 },
  
  phoneInputBox: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 15, marginBottom: 40 },
  flagIcon: { width: 35, height: 25, marginRight: 15 }, // Thu nhỏ cờ lại một chút, đẩy margin ra
  phonePrefix: { fontSize: 18, color: Colors.textDark, fontWeight: '500' }, // Style cho chữ +880
  dividerContainer: { alignItems: 'center', marginBottom: 30 },
  dividerText: { color: Colors.textLight, fontSize: 14, fontWeight: '600' },
  
  // Style cho nút Google/Facebook bằng ảnh
  socialBtnWrapper: { marginBottom: 20 }, // Tạo khoảng cách giữa 2 nút
  socialImage: { width: '100%', height: 65 } // Ép ảnh dài ra bằng màn hình, height tự chỉnh cho vừa
});