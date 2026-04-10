import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

const CheckoutRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.valueRow}>
      {children}
      <Ionicons name="chevron-forward" size={18} color={Colors.textDark} style={styles.chevron} />
    </View>
  </View>
);

export default function CheckoutModal() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backdrop} onPress={() => router.back()} />
      <View style={styles.modalContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Checkout</Text>
          <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} /></TouchableOpacity>
        </View>

        {/* Content Rows */}
        <CheckoutRow label="Delivery">
          <Text style={styles.valueText}>Select Method</Text>
        </CheckoutRow>

        {/* 👉 DÒNG PAYMENT ĐÃ ĐƯỢC CHÈN PNG MASTER CARD */}
        <CheckoutRow label="Payment">
           <Image 
              source={require('../assets/images/mastercard.png')} // 👉 Đường dẫn file PNG local
              style={styles.paymentIcon} 
              resizeMode="contain" 
           />
          
        </CheckoutRow>

        <CheckoutRow label="Promo Code">
          <Text style={styles.valueText}>Pick discount</Text>
        </CheckoutRow>

        <CheckoutRow label="Total Cost">
          <Text style={styles.valueText}>$13.97</Text>
        </CheckoutRow>
        
        {/* Terms */}
        <Text style={styles.termsText}>
          By placing an order you agree to our <Text style={{fontWeight: 'bold', color: Colors.textDark}}>Terms And Conditions</Text>
        </Text>

        {/* 👉 NÚT THANH TOÁN THÀNH CÔNG (MẶC ĐỊNH) */}
        <TouchableOpacity 
          style={styles.orderButton} 
          onPress={() => router.push('/order-accepted')}
        >
          <Text style={styles.orderButtonText}>Place Order (Success)</Text>
        </TouchableOpacity>

        {/* 👉 NEW: NÚT GIẢ LẬP LỖI THANH TOÁN (ĐỂ TEST MÀN ERROR) */}
        <TouchableOpacity 
          style={[styles.orderButton, styles.errorButton]} // Sử dụng style lỗi
          onPress={() => router.push('/order-error')} // Bay sang màn Error
        >
          <Text style={styles.orderButtonText}>Place Order (Simulate Error)</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  backdrop: { flex: 1 },
  modalContent: { 
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 25,
    paddingBottom: Platform.OS === 'ios' ? 40 : 25 // Xử lý khoảng trống dưới đáy cho iPhone
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.textDark },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  label: { fontSize: 18, color: Colors.textLight, fontWeight: '600' },
  valueRow: { flexDirection: 'row', alignItems: 'center' },
  valueText: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark },
  
  // 👉 Style cho icon Mastercard PNG
  paymentIcon: { width: 35, height: 25, marginRight: 10 },
  chevron: { marginLeft: 10 },

  termsText: { fontSize: 14, color: Colors.textLight, marginTop: 25, marginBottom: 25, lineHeight: 20 },
  orderButton: { backgroundColor: Colors.primary, height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  orderButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  
  // 👉 Style cho nút lỗi
  errorButton: { backgroundColor: '#F2F3F2', borderWidth: 1, borderColor: '#eee' }, 
});