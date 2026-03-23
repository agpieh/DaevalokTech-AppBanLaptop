import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>Loging</Text>
          <Text style={styles.subtitle}>Enter your emails and password</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Mời nhập email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
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
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => alert('Đăng nhập thành công!')}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signupLink}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  
  // 👉 Đã tăng marginTop từ 30 lên 40 ở đây
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
  
  forgotPassword: { alignItems: 'flex-end', marginBottom: 30 },
  forgotText: { fontSize: 14, color: Colors.textDark, fontWeight: '500' },
  
  loginButton: { backgroundColor: Colors.primary, width: '100%', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center', shadowColor: '#53B175', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5, marginBottom: 25 },
  loginButtonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
  
  signupContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signupText: { fontSize: 14, color: Colors.textDark, fontWeight: '600' },
  signupLink: { fontSize: 14, color: Colors.primary, fontWeight: 'bold' }
});