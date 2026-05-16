import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { storageService } from '../services/storageService'; // Nhớ import service

export default function SignUpScreen() {
  const router = useRouter();
  
  // 👉 3 biến chứa dữ liệu người dùng gõ vào
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 👉 HÀM XỬ LÝ ĐĂNG KÝ
  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // 1. Lưu thông tin vào bộ nhớ trong của máy
    await storageService.saveUserInfo({ name: name, email: email });
    
    Alert.alert("Thành công", "Chào mừng " + name + " đến với Daevalok Tech!", [
      { text: "OK", onPress: () => router.replace('/(tabs)' as any) } // Bay vào Home
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.content}>
          <Image source={require('../assets/images/logo/logo-dark-transparent.png')} style={styles.logo} resizeMode="contain" />
          
          <Text style={styles.title}>Đăng ký</Text>
          <Text style={styles.subtitle}>Tạo tài khoản để bắt đầu mua sắm</Text>

          {/* 👉 Ô NHẬP TÊN NGƯỜI DÙNG */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Tên hiển thị</Text>
            <TextInput 
              style={styles.input} 
              placeholder="VD: Trần Đại Hiệp" 
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Nhập email của bạn" 
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={styles.passwordContainer}>
              <TextInput 
                style={styles.passwordInput} 
                placeholder="Tạo mật khẩu" 
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color={Colors.textLight} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
            <Text style={styles.loginButtonText}>Đăng ký</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.signupLink}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { flex: 1, paddingHorizontal: 25, paddingTop: 40 },
  logo: { width: 80, height: 40, alignSelf: 'center', marginBottom: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: Colors.textDark, marginBottom: 10 },
  subtitle: { fontSize: 16, color: Colors.textLight, marginBottom: 30 },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 16, color: Colors.textLight, fontWeight: '600', marginBottom: 10 },
  input: { borderBottomWidth: 1, borderBottomColor: '#E2E2E2', fontSize: 18, color: Colors.textDark, paddingVertical: 10 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  passwordInput: { flex: 1, fontSize: 18, color: Colors.textDark, paddingVertical: 10 },
  loginButton: { backgroundColor: Colors.primary, width: '100%', paddingVertical: 18, borderRadius: 19, alignItems: 'center', marginTop: 20, marginBottom: 20 },
  loginButtonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
  signupContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  signupText: { color: Colors.textDark, fontSize: 15, fontWeight: '600' },
  signupLink: { color: Colors.primary, fontSize: 15, fontWeight: 'bold' }
});