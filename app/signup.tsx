import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

export default function SignupScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Regex siêu chuẩn để check định dạng email (VD: abc@gmail.com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(text));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Enter your credentials to continue</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} placeholder="Afsar Hossen" autoCapitalize="words" value={username} onChangeText={setUsername} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          {/* Bao bọc TextInput trong một View để nhét icon ✓ vào cuối */}
          <View style={[styles.passwordContainer, { borderBottomColor: isEmailValid ? Colors.primary : '#E2E2E2' }]}>
            <TextInput 
              style={styles.passwordInput} 
              placeholder="Imshuvo97@gmail.com" 
              keyboardType="email-address" 
              autoCapitalize="none" 
              value={email} 
              onChangeText={handleEmailChange} // Gọi hàm check Regex ở trên
            />
            {/* Nếu isEmailValid = true thì mới hiện cái icon này */}
            {isEmailValid && (
              <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput style={styles.passwordInput} placeholder="**********" secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={22} color={Colors.textLight} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.termsText}>
          By continuing you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Privacy Policy.</Text>
        </Text>

        <TouchableOpacity style={styles.signupButton} onPress={() => alert('Đăng ký thành công!')}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  
  logoContainer: { alignItems: 'center', marginTop: 50, marginBottom: 50 },
  logo: { width: 50, height: 55 },
  
  header: { marginBottom: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: Colors.textDark, marginBottom: 10 },
  subtitle: { fontSize: 16, color: Colors.textLight },
  
  inputGroup: { marginBottom: 30 },
  label: { fontSize: 16, color: Colors.textLight, fontWeight: '600', marginBottom: 10 },
  input: { fontSize: 18, color: Colors.textDark, borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 10 },
  
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 10 },
  passwordInput: { flex: 1, fontSize: 18, color: Colors.textDark },
  
  // Style cho đoạn chữ Điều khoản dịch vụ
  termsText: { fontSize: 14, color: Colors.textLight, lineHeight: 22, marginBottom: 30, letterSpacing: 0.5 },
  termsLink: { color: Colors.primary, fontWeight: 'bold' },
  
  signupButton: { backgroundColor: Colors.primary, width: '100%', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center', shadowColor: '#53B175', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5, marginBottom: 25 },
  signupButtonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
  
  loginContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginText: { fontSize: 14, color: Colors.textDark, fontWeight: '600' },
  loginLink: { fontSize: 14, color: Colors.primary, fontWeight: 'bold' }
});