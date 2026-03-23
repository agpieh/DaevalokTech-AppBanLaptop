import React, { useState } from 'react';
// 👉 BỔ SUNG: Import thêm KeyboardAvoidingView và Platform
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

export default function VerifyScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* 👉 BỌC TOÀN BỘ BẰNG KeyboardAvoidingView */}
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Nút Back */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={Colors.textDark} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Enter your 4-digit code</Text>
          <Text style={styles.label}>Code</Text>
          
          {/* Khu vực nhập mã OTP */}
          <TextInput 
            style={styles.input}
            placeholder="- - - -"
            keyboardType="number-pad" 
            maxLength={4} 
            autoFocus={true} 
            value={code}
            onChangeText={setCode}
          />
        </View>

        {/* Thanh công cụ chứa nút Resend và mũi tên sẽ tự động bị đẩy lên */}
        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => alert('Đã gửi lại mã mới!')}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.fab}
            onPress={() => router.push('/location')} 
          >
            <Ionicons name="chevron-forward" size={30} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  backButton: { marginHorizontal: 20, marginTop: 40, width: 40, height: 40, justifyContent: 'center' },
  content: { paddingHorizontal: 25, marginTop: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: Colors.textDark, marginBottom: 30 },
  label: { fontSize: 16, color: Colors.textLight, fontWeight: '600', marginBottom: 15 },
  
  input: { fontSize: 24, color: Colors.textDark, letterSpacing: 10, borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 10 },
  
  // 👉 SỬA LẠI ĐOẠN NÀY: Đổi bottom từ 50 xuống 20 để vừa khít sát mép bàn phím
  bottomRow: { position: 'absolute', bottom: 20, left: 25, right: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resendText: { color: Colors.primary, fontSize: 16, fontWeight: '600' },
  
  fab: { width: 65, height: 65, borderRadius: 35, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }
});