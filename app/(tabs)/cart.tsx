import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router'; // 👉 Thêm useFocusEffect
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { storageService } from '../../services/storageService'; // 👉 Import service

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);

  // 👉 1. LOAD GIỎ HÀNG KHI MỞ TRANG (Dùng useFocusEffect để mỗi lần bấm sang Tab này đều tự động refresh)
  useFocusEffect(
    useCallback(() => {
      const loadCart = async () => {
        const savedCart = await storageService.getCart();
        // Đã xóa đoạn code fake nhét chuối táo ở đây
        setCartItems(savedCart); 
      };
      loadCart();
    }, [])
  );

  // 👉 2. HÀM CỐT LÕI: Vừa cập nhật State, vừa lưu xuống ổ cứng
  const updateCartAndSave = async (newCart: any) => {
    setCartItems(newCart);
    await storageService.saveCart(newCart);
  };

  // 👉 3. HÀM TĂNG SỐ LƯỢNG
  const increaseQuantity = (index: number) => {
    const newCart = [...cartItems];
    newCart[index].quantity += 1;
    updateCartAndSave(newCart);
  };

  // 👉 4. HÀM GIẢM SỐ LƯỢNG
  const decreaseQuantity = (index: number) => {
    const newCart = [...cartItems];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      updateCartAndSave(newCart);
    } else {
      // Nếu số lượng là 1 mà bấm trừ nữa thì xóa luôn
      removeItem(index);
    }
  };

  // 👉 5. HÀM XÓA SẢN PHẨM
  const removeItem = (index: number) => {
    Alert.alert("Xóa sản phẩm", "Bạn có chắc chắn muốn xóa khỏi giỏ hàng?", [
      { text: "Hủy", style: "cancel" },
      { 
        text: "Xóa", 
        style: "destructive",
        onPress: () => {
          const newCart = [...cartItems];
          newCart.splice(index, 1);
          updateCartAndSave(newCart);
        }
      }
    ]);
  };

  // Tính tổng tiền
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  // Component render từng sản phẩm
  const renderCartItem = ({ item, index }: any) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.itemDetails}>
        <View style={styles.titleRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          {/* 👉 GẮN HÀM XÓA */}
          <TouchableOpacity onPress={() => removeItem(index)}>
            <Ionicons name="close" size={24} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemWeight}>{item.weight}</Text>
        
        <View style={styles.priceRow}>
          <View style={styles.quantityContainer}>
            {/* 👉 GẮN HÀM GIẢM */}
            <TouchableOpacity style={styles.qtyBtn} onPress={() => decreaseQuantity(index)}>
              <Ionicons name="remove" size={24} color={Colors.textLight} />
            </TouchableOpacity>
            
            <View style={styles.qtyBox}>
              <Text style={styles.qtyText}>{item.quantity}</Text>
            </View>
            
            {/* 👉 GẮN HÀM TĂNG */}
            <TouchableOpacity style={styles.qtyBtn} onPress={() => increaseQuantity(index)}>
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

      <View style={styles.checkoutContainer}>
        {/* Để nút Checkout vẫn chạy được */}
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