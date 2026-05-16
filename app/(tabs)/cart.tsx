import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { storageService } from '../../services/storageService';

// Hàm helper để định dạng tiền VNĐ (VD: 1599 -> 1,599,000 đ)
// Giả sử bồ nhập giá trong data.ts là USD, ta nhân tỷ giá 25000 để ra VNĐ
const formatCurrency = (priceInUSD: number) => {
  const priceInVND = priceInUSD * 25000;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceInVND);
};

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadCart = async () => {
        const savedCart = await storageService.getCart();
        setCartItems(savedCart); 
      };
      loadCart();
    }, [])
  );

  const updateCartAndSave = async (newCart: any) => {
    setCartItems(newCart);
    await storageService.saveCart(newCart);
  };

  const increaseQuantity = (index: number) => {
    const newCart = [...cartItems];
    newCart[index].quantity += 1;
    updateCartAndSave(newCart);
  };

  const decreaseQuantity = (index: number) => {
    const newCart = [...cartItems];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      updateCartAndSave(newCart);
    } else {
      removeItem(index);
    }
  };

  const removeItem = (index: number) => {
    Alert.alert("Xóa sản phẩm", "Bạn có chắc chắn muốn bỏ sản phẩm này khỏi giỏ hàng?", [
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

  // Tính tổng tiền (vẫn tính bằng USD gốc để chuẩn logic, format sau)
  const totalAmountUSD = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const renderCartItem = ({ item, index }: any) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.itemDetails}>
        <View style={styles.titleRow}>
          <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeItem(index)}>
            <Ionicons name="close" size={24} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemWeight} numberOfLines={1}>{item.specs}</Text>
        
        <View style={styles.priceRow}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => decreaseQuantity(index)}>
              <Ionicons name="remove" size={24} color={Colors.textLight} />
            </TouchableOpacity>
            
            <View style={styles.qtyBox}>
              <Text style={styles.qtyText}>{item.quantity}</Text>
            </View>
            
            <TouchableOpacity style={styles.qtyBtn} onPress={() => increaseQuantity(index)}>
              <Ionicons name="add" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          {/* Format giá từng sản phẩm */}
          <Text style={styles.itemPrice}>{formatCurrency(item.price * item.quantity)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng của bạn</Text>
      </View>

      {cartItems.length === 0 ? (
        // Xử lý UI khi giỏ hàng trống
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={80} color={Colors.textLight} />
          <Text style={styles.emptyCartText}>Giỏ hàng đang trống</Text>
          <TouchableOpacity style={styles.shopNowBtn} onPress={() => router.push('/')}>
            <Text style={styles.shopNowText}>Tiếp tục mua sắm</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Chỉ hiện nút thanh toán khi có hàng trong giỏ */}
      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity style={styles.checkoutButton} onPress={() => router.push('/checkout')}>
            <Text style={styles.checkoutText}>Tiến hành thanh toán</Text>
            <View style={styles.totalBadge}>
              <Text style={styles.totalText}>{formatCurrency(totalAmountUSD)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingTop: 40 },
  header: { alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.textDark },
  
  // Thêm style cho giỏ hàng trống
  emptyCartContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -50 },
  emptyCartText: { fontSize: 18, color: Colors.textLight, marginTop: 20, marginBottom: 30 },
  shopNowBtn: { backgroundColor: Colors.primary, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 15 },
  shopNowText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },

  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  divider: { height: 1, backgroundColor: '#E2E2E2', marginVertical: 15 },
  cartItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  itemImage: { width: 80, height: 80, marginRight: 15 }, // Tăng nhẹ size ảnh
  itemDetails: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark, flex: 1, marginRight: 10 }, // Thêm flex để không đè nút xóa
  itemWeight: { fontSize: 13, color: Colors.textLight, marginBottom: 10 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 35, height: 35, borderRadius: 12, borderWidth: 1, borderColor: '#E2E2E2', justifyContent: 'center', alignItems: 'center' },
  qtyBox: { width: 35, justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontSize: 16, fontWeight: '600', color: Colors.textDark },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark }, // Giảm nhẹ size chữ giá tiền để vừa chuỗi dài
  checkoutContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10, backgroundColor: Colors.white },
  checkoutButton: { flexDirection: 'row', backgroundColor: Colors.primary, width: '100%', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  checkoutText: { color: Colors.white, fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'left' }, // Căn trái chữ
  totalBadge: { backgroundColor: 'rgba(0,0,0,0.15)', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8 },
  totalText: { color: Colors.white, fontSize: 14, fontWeight: 'bold' }
});