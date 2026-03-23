import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

export default function LocationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Nút Back */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} color={Colors.textDark} />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Ảnh minh họa bản đồ */}
        <Image 
          source={require('../assets/images/illustration.png')} // 👉 NHỚ ĐỔI TÊN FILE ẢNH BẢN ĐỒ VÀO ĐÂY
          style={styles.illustration} 
          resizeMode="contain" 
        />

        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.subtitle}>
          Switch on your location to stay in tune with{'\n'}what's happening in your area
        </Text>

        {/* Ô chọn Zone (Khu vực) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Zone</Text>
          <TouchableOpacity style={styles.dropdown} activeOpacity={0.7}>
            <Text style={styles.dropdownText}>Viet Nam</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* Ô chọn Area (Khu vực chi tiết) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Area</Text>
          <TouchableOpacity style={styles.dropdown} activeOpacity={0.7}>
            <Text style={styles.dropdownPlaceholder}>Types of your area</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Nút Submit ở dưới cùng */}
      <View style={styles.bottomContainer}>
        {/* Tạm thời bấm Submit sẽ nhảy sang trang Log in nhé */}
        <TouchableOpacity style={styles.submitButton} onPress={() => router.push('/login')}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  backButton: { marginHorizontal: 20, marginTop: 30, width: 40, height: 40, justifyContent: 'center' },
  content: { flex: 1, paddingHorizontal: 25, alignItems: 'center', marginTop: 10 },
  
  // Style cho ảnh minh họa
  illustration: { width: 220, height: 170, marginBottom: 30 },
  
  title: { fontSize: 26, fontWeight: 'bold', color: Colors.textDark, marginBottom: 15, textAlign: 'center' },
  subtitle: { fontSize: 16, color: Colors.textLight, textAlign: 'center', marginBottom: 40, lineHeight: 22 },
  
  // Style cho các ô chọn (Dropdown)
  inputGroup: { width: '100%', marginBottom: 25 },
  label: { fontSize: 16, color: Colors.textLight, fontWeight: '600', marginBottom: 10 },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 15 },
  dropdownText: { fontSize: 18, color: Colors.textDark, fontWeight: '500' },
  dropdownPlaceholder: { fontSize: 18, color: '#B3B3B3' }, // Màu xám nhạt cho chữ chưa chọn
  
  // Style cho nút Submit
  bottomContainer: { paddingHorizontal: 25, paddingBottom: 40 },
  submitButton: { backgroundColor: Colors.primary, width: '100%', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center', shadowColor: '#53B175', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  submitButtonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' }
});