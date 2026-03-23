import React, { useState } from 'react';
// 👉 IMPORT THÊM KeyboardAvoidingView và Platform
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

export default function PhoneScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 6) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
    } else if (cleaned.length > 3) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}`;
    }
    setPhoneNumber(formatted);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 👉 BỌC TOÀN BỘ NỘI DUNG BẰNG KeyboardAvoidingView */}
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        // Phân biệt iOS và Android để đẩy lên mượt nhất
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={Colors.textDark} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Enter your mobile number</Text>
          <Text style={styles.label}>Mobile Number</Text>
          
          <View style={styles.inputContainer}>
            <Image 
              source={require('../assets/images/vietnam.png')} 
              style={styles.flagIcon} 
              resizeMode="contain" 
            />
            <Text style={styles.prefix}>+84</Text>
            
            <TextInput 
              style={styles.input}
              placeholder="--- --- ----"
              keyboardType="phone-pad"
              autoFocus={true}
              value={phoneNumber}
              onChangeText={handlePhoneChange} 
              maxLength={12} 
            />
          </View>
        </View>

        {/* Nút FAB bây giờ sẽ tự động bám theo bàn phím */}
        <TouchableOpacity style={styles.fab} onPress={() => router.push('/verify')}>
          <Ionicons name="chevron-forward" size={30} color={Colors.white} />
        </TouchableOpacity>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  backButton: { marginHorizontal: 20, marginTop: 30, width: 40, height: 40, justifyContent: 'center' },
  content: { paddingHorizontal: 25, marginTop: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: Colors.textDark, marginBottom: 30 },
  label: { fontSize: 16, color: Colors.textLight, fontWeight: '600', marginBottom: 10 },
  
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 10 },
  flagIcon: { width: 35, height: 25, marginRight: 15 },
  prefix: { fontSize: 18, color: Colors.textDark, marginRight: 10, fontWeight: '500' },
  input: { flex: 1, fontSize: 18, color: Colors.textDark, letterSpacing: 1 },
  
  // 👉 SỬA LẠI ĐOẠN NÀY: Giảm bottom xuống 20 để nó nằm sát vừa vặn ngay trên bàn phím
  fab: { position: 'absolute', right: 25, bottom: 20, width: 65, height: 65, borderRadius: 35, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }
});