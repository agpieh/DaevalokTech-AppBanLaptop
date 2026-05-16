import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { storageService } from '../services/storageService';

// Format tiền tệ
const formatCurrency = (priceInUSD: number) => {
  const priceInVND = priceInUSD * 25000;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceInVND);
};

export default function CheckoutModal() {
  const router = useRouter();
  const [totalCost, setTotalCost] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('momo');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Hộp chứa đồng hồ đếm ngược
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const loadTotal = async () => {
      const cart = await storageService.getCart();
      const total = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      setTotalCost(total);
    };
    loadTotal();

    // Dọn rác khi component bị hủy ngang
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const currentCart = await storageService.getCart();
      
      if (currentCart.length === 0) {
        Alert.alert("Lỗi", "Giỏ hàng đang trống!");
        return;
      }

      const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

      const newOrder = {
        id: orderId, 
        items: currentCart,
        total: totalCost,
        paymentMethod: selectedPayment.toUpperCase(), 
        date: new Date().toLocaleString('vi-VN'),
      };

      // COD thì phi thẳng qua Thành công
      if (selectedPayment === 'cod') {
        await storageService.saveOrder(newOrder);
        await storageService.clearCart();
        router.push('/order-result?status=success' as any);
        return;
      }

      // Ví điện tử thì bật Loading
      setIsProcessing(true);
      await storageService.saveOrder(newOrder);
      await storageService.clearCart();
      
      // Chạy đồng hồ 3.5s
      timeoutRef.current = setTimeout(() => {
        setIsProcessing(false);
        router.push('/order-result?status=success' as any);
      }, 3500);

    } catch (error) {
      setIsProcessing(false);
      Alert.alert("Lỗi", "Giao dịch thất bại. Vui lòng thử lại!");
    }
  };

  const handleCancelPayment = () => {
    // Đập vỡ đồng hồ ngay lập tức nếu user bấm Hủy
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsProcessing(false);
    router.push('/order-error' as any); 
  };

  const PaymentOption = ({ id, label, icon, color }: any) => {
    const isSelected = selectedPayment === id;
    return (
      <TouchableOpacity 
        style={[styles.paymentBox, isSelected && styles.paymentBoxActive]} 
        onPress={() => setSelectedPayment(id)}
        disabled={isProcessing}
      >
        <View style={[styles.iconWrapper, { backgroundColor: color }]}>
          <Ionicons name={icon} size={24} color="#FFF" />
        </View>
        <Text style={[styles.paymentLabel, isSelected && styles.paymentLabelActive]}>{label}</Text>
        {isSelected && <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backdrop} 
        onPress={() => { if (!isProcessing) router.back(); }} 
      />
      
      <View style={styles.modalContent}>
        
        {isProcessing ? (
          <View style={styles.processingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} style={{ marginBottom: 20, transform: [{ scale: 1.5 }] }} />
            <Text style={styles.processingTitle}>Đang xử lý giao dịch...</Text>
            <Text style={styles.processingText}>Đang kết nối cổng thanh toán {selectedPayment.toUpperCase()}</Text>
            
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelPayment}>
              <Text style={styles.cancelBtnText}>Hủy giao dịch</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Xác nhận Thanh toán</Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close" size={24} color={Colors.textDark} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.section}>
                <View style={styles.row}>
                  <Text style={styles.label}>Tổng tiền hàng</Text>
                  <Text style={styles.valueText}>{formatCurrency(totalCost)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Phí vận chuyển</Text>
                  <Text style={styles.valueText}>Miễn phí</Text>
                </View>
                <View style={[styles.row, { borderBottomWidth: 0 }]}>
                  <Text style={styles.totalLabel}>Tổng cộng</Text>
                  <Text style={styles.totalValue}>{formatCurrency(totalCost)}</Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
              
              <PaymentOption id="momo" label="Ví điện tử MoMo" icon="wallet" color="#A50064" />
              <PaymentOption id="vnpay" label="VNPay / Thẻ ATM" icon="card" color="#005BAA" />
              <PaymentOption id="cod" label="Thanh toán khi nhận hàng (COD)" icon="cash" color="#53B175" />

              <Text style={styles.termsText}>
                Bằng việc đặt hàng, bạn đồng ý với{' '}
                <Text style={{fontWeight: 'bold', color: Colors.primary}}>Điều khoản sử dụng</Text> của chúng tôi.
              </Text>

              <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
                <Text style={styles.orderButtonText}>Đặt hàng & Thanh toán</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  backdrop: { flex: 1 },
  modalContent: { 
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#F5F5F5', 
    borderTopLeftRadius: 30, borderTopRightRadius: 30, 
    padding: 25, maxHeight: '85%', minHeight: 400, 
    paddingBottom: Platform.OS === 'ios' ? 40 : 25 
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.textDark },
  
  section: { backgroundColor: '#FFF', borderRadius: 15, padding: 15, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  label: { fontSize: 16, color: Colors.textLight },
  valueText: { fontSize: 16, fontWeight: '600', color: Colors.textDark },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: Colors.textDark },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: Colors.primary },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.textDark, marginBottom: 15 },
  
  paymentBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: '#FFF' },
  paymentBoxActive: { borderColor: Colors.primary, backgroundColor: '#F0F5FF' }, 
  iconWrapper: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  paymentLabel: { flex: 1, fontSize: 16, color: Colors.textDark, fontWeight: '500' },
  paymentLabelActive: { fontWeight: 'bold', color: Colors.primary },

  termsText: { fontSize: 13, color: Colors.textLight, marginTop: 15, marginBottom: 20, textAlign: 'center', paddingHorizontal: 10 },
  orderButton: { backgroundColor: Colors.primary, height: 60, borderRadius: 19, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  orderButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  processingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 },
  processingTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.textDark, marginBottom: 10 },
  processingText: { fontSize: 16, color: Colors.textLight, textAlign: 'center', marginBottom: 40 },
  cancelBtn: { paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, backgroundColor: '#FFEAEA' },
  cancelBtnText: { color: '#FF4747', fontSize: 16, fontWeight: 'bold' }
});