import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // 👉 1. THÊM IMPORT NÀY
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { products } from '../../constants/data';

export default function CartScreen() {
  const router = useRouter(); // 👉 2. KHỞI TẠO ROUTER Ở ĐÂY
  
  // Giả lập giỏ hàng
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 1 },
    { ...products[2], quantity: 1 },
  ]);

  // Logic tính tổng tiền tự động
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  // Component render từng dòng trong giỏ hàng
  const renderCartItem = ({ item, index }: any) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.itemDetails}>
        <View style={styles.titleRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => {
            const newCart = [...cartItems];
            newCart.splice(index, 1);
            setCartItems(newCart);
          }}>
            <Ionicons name="close" size={24} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemWeight}>{item.weight}</Text>
        
        <View style={styles.priceRow}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.qtyBtn}>
              <Ionicons name="remove" size={24} color={Colors.textLight} />
            </TouchableOpacity>
            <View style={styles.qtyBox}>
              <Text style={styles.qtyText}>{item.quantity}</Text>
            </View>
            <TouchableOpacity style={styles.qtyBtn}>
              <Ionicons name="add" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Nút Thanh toán có đính kèm Tổng tiền */}
      <View style={styles.checkoutContainer}>
        {/* 👉 3. SỬA LINK TRỎ SANG '/checkout' CHUẨN XÁC */}
        <TouchableOpacity style={styles.checkoutButton} onPress={() => router.push('/checkout')}>
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.totalBadge}>
            <Text style={styles.totalText}>${totalAmount}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingTop: 40 },
  header: { alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.textDark },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  divider: { height: 1, backgroundColor: '#E2E2E2', marginVertical: 15 },
  cartItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  itemImage: { width: 70, height: 70, marginRight: 20 },
  itemDetails: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark },
  itemWeight: { fontSize: 14, color: Colors.textLight, marginBottom: 10 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 35, height: 35, borderRadius: 12, borderWidth: 1, borderColor: '#E2E2E2', justifyContent: 'center', alignItems: 'center' },
  qtyBox: { width: 35, justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontSize: 16, fontWeight: '600', color: Colors.textDark },
  itemPrice: { fontSize: 18, fontWeight: 'bold', color: Colors.textDark },
  checkoutContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10, backgroundColor: Colors.white },
  checkoutButton: { flexDirection: 'row', backgroundColor: Colors.primary, width: '100%', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  checkoutText: { color: Colors.white, fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  totalBadge: { backgroundColor: 'rgba(0,0,0,0.1)', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8 },
  totalText: { color: Colors.white, fontSize: 14, fontWeight: '600' }
});