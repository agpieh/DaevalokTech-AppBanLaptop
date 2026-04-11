import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { storageService } from '../services/storageService';

// ==========================================
// COMPONENT PHỤ: Giao diện từng dòng Checkout
// ==========================================
const CheckoutRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.valueRow}>
      {children}
      <Ionicons name="chevron-forward" size={18} color={Colors.textDark} style={styles.chevron} />
    </View>
  </View>
);

// ==========================================
// COMPONENT CHÍNH: Màn hình Checkout
// ==========================================
export default function CheckoutModal() {
  const router = useRouter();
  const [totalCost, setTotalCost] = useState('0.00');

  // 1. Tự động tính tổng tiền khi mở bảng Checkout
  useEffect(() => {
    const loadTotal = async () => {
      const cart = await storageService.getCart();
      const total = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      setTotalCost(total.toFixed(2));
    };
    loadTotal();
  }, []);

  // 2. Logic xử lý khi bấm nút "Place Order"
  const handlePlaceOrder = async () => {
    try {
      const currentCart = await storageService.getCart();
      
      if (currentCart.length === 0) {
        Alert.alert("Thông báo", "Giỏ hàng của bạn đang trống!");
        return;
      }

      // Tạo đơn hàng mới
      const newOrder = {
        id: 'ORD' + Math.floor(Math.random() * 100000), // VD: ORD12345
        items: currentCart,
        total: totalCost,
        date: new Date().toLocaleString('vi-VN'),
      };

      // Lưu đơn -> Xóa giỏ -> Bay sang màn Thành công
      await storageService.saveOrder(newOrder);
      await storageService.clearCart();
      router.push('/order-result?status=success');

    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      Alert.alert("Lỗi", "Không thể đặt hàng lúc này. Vui lòng thử lại!");
    }
  };

  // 3. Giao diện (UI)
  return (
    <View style={styles.container}>
      {/* Bấm ra ngoài vùng tối để đóng Modal */}
      <TouchableOpacity style={styles.backdrop} onPress={() => router.back()} />
      
      <View style={styles.modalContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Checkout</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={Colors.textDark} />
          </TouchableOpacity>
        </View>

        {/* Các dòng thông tin */}
        <CheckoutRow label="Delivery">
          <Text style={styles.valueText}>Select Method</Text>
        </CheckoutRow>

        <CheckoutRow label="Payment">
           <Image 
              source={require('../assets/images/mastercard.png')}
              style={styles.paymentIcon} 
              resizeMode="contain" 
           />
           <Text style={styles.valueText}>**** **** 4567</Text> 
        </CheckoutRow>

        <CheckoutRow label="Promo Code">
          <Text style={styles.valueText}>Pick discount</Text>
        </CheckoutRow>

        <CheckoutRow label="Total Cost">
          <Text style={styles.valueText}>${totalCost}</Text> 
        </CheckoutRow>
        
        {/* Điều khoản */}
        <Text style={styles.termsText}>
          By placing an order you agree to our{' '}
          <Text style={{fontWeight: 'bold', color: Colors.textDark}}>Terms And Conditions</Text>
        </Text>

        {/* Nút đặt hàng Thành công */}
        <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
          <Text style={styles.orderButtonText}>Place Order (Success)</Text>
        </TouchableOpacity>

        {/* Nút giả lập Thất bại */}
        <TouchableOpacity 
          style={[styles.orderButton, styles.errorButton]}
          onPress={() => router.push('/order-result?status=error')}
        >
          <Text style={[styles.orderButtonText, { color: Colors.textDark }]}>Simulate Error</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// ==========================================
// STYLES
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  backdrop: { flex: 1 },
  modalContent: { 
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'white', 
    borderTopLeftRadius: 30, borderTopRightRadius: 30, 
    padding: 25,
    paddingBottom: Platform.OS === 'ios' ? 40 : 25 
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.textDark },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  label: { fontSize: 18, color: Colors.textLight, fontWeight: '600' },
  valueRow: { flexDirection: 'row', alignItems: 'center' },
  valueText: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark },
  paymentIcon: { width: 35, height: 25, marginRight: 10 },
  chevron: { marginLeft: 10 },
  termsText: { fontSize: 14, color: Colors.textLight, marginTop: 25, marginBottom: 25, lineHeight: 20 },
  orderButton: { backgroundColor: Colors.primary, height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  orderButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  errorButton: { backgroundColor: '#F2F3F2', borderWidth: 1, borderColor: '#eee' }, 
});