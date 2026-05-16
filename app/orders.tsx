import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { storageService } from '../services/storageService';

const formatCurrency = (priceInUSD: number) => {
  const priceInVND = priceInUSD * 25000;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceInVND);
};

export default function OrdersScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadOrders = async () => {
        const data = await storageService.getOrders();
        // Sắp xếp đơn hàng mới nhất lên đầu (nếu data chưa xếp)
        const sortedData = data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setOrders(sortedData);
      };
      loadOrders();
    }, [])
  );

  const renderOrderItem = ({ item }: any) => (
    <View style={styles.orderCard}>
      {/* Header: Mã đơn + Trạng thái */}
      <View style={styles.orderHeader}>
        <View style={styles.shopInfo}>
          <Ionicons name="storefront" size={16} color={Colors.textDark} />
          <Text style={styles.shopName}> Daevalok Tech</Text>
        </View>
        <Text style={styles.statusText}>Hoàn thành</Text>
      </View>

      {/* Body: Danh sách sản phẩm (Hiển thị tối đa 2 món đầu tiên) */}
      <View style={styles.orderBody}>
        {item.items.slice(0, 2).map((prod: any, index: number) => (
          <View key={index} style={styles.productRow}>
            <Image source={prod.image} style={styles.productImg} resizeMode="contain" />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>{prod.name}</Text>
              <Text style={styles.productQty}>x{prod.quantity}</Text>
            </View>
            <Text style={styles.productPrice}>{formatCurrency(prod.price)}</Text>
          </View>
        ))}
        
        {/* Nếu mua nhiều hơn 2 món, hiện dòng tóm tắt */}
        {item.items.length > 2 && (
          <Text style={styles.moreItemsText}>...và {item.items.length - 2} sản phẩm khác</Text>
        )}
      </View>

      {/* Footer: Tổng tiền + Ngày mua */}
      <View style={styles.orderFooter}>
        <View>
          <Text style={styles.orderDate}>{item.date}</Text>
          <Text style={styles.orderId}>Mã đơn: #{item.id?.substring(0, 8).toUpperCase() || '1029A'}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Thành tiền: </Text>
          <Text style={styles.totalPrice}>{formatCurrency(item.total)}</Text>
        </View>
      </View>
      
      {/* Nút thao tác */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.reorderBtn} onPress={() => router.push('/(tabs)' as any)}>
          <Text style={styles.reorderText}>Mua lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Trang */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color={Colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử Đơn hàng</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Danh sách hoặc Trạng thái trống */}
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={80} color="#D9D9D9" />
          <Text style={styles.emptyText}>Chưa có đơn hàng nào</Text>
          <TouchableOpacity style={styles.shopNowBtn} onPress={() => router.push('/(tabs)' as any)}>
            <Text style={styles.shopNowText}>Tiếp tục mua sắm</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => item.id || index.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingTop: 40 }, // Nền xám nhạt để card trắng nổi bật
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 15, backgroundColor: 'white' },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.textDark },
  
  listContent: { padding: 15 },
  
  // Style cho Card Đơn hàng (Giống Shopee)
  orderCard: { backgroundColor: 'white', borderRadius: 12, marginBottom: 15, padding: 15, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingBottom: 10, marginBottom: 10 },
  shopInfo: { flexDirection: 'row', alignItems: 'center' },
  shopName: { fontSize: 14, fontWeight: 'bold', color: Colors.textDark },
  statusText: { fontSize: 14, color: Colors.primary, fontWeight: 'bold' },
  
  orderBody: { paddingBottom: 10 },
  productRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  productImg: { width: 60, height: 60, borderRadius: 8, borderWidth: 1, borderColor: '#F0F0F0', marginRight: 12 },
  productInfo: { flex: 1, justifyContent: 'center' },
  productName: { fontSize: 14, color: Colors.textDark, fontWeight: '500', marginBottom: 4 },
  productQty: { fontSize: 13, color: Colors.textLight },
  productPrice: { fontSize: 14, color: Colors.textDark, fontWeight: 'bold', marginLeft: 10 },
  moreItemsText: { fontSize: 13, color: Colors.textLight, textAlign: 'center', marginTop: 5, fontStyle: 'italic' },
  
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 12, marginBottom: 15 },
  orderDate: { fontSize: 12, color: Colors.textLight, marginBottom: 4 },
  orderId: { fontSize: 12, color: Colors.textLight },
  totalContainer: { flexDirection: 'row', alignItems: 'center' },
  totalLabel: { fontSize: 14, color: Colors.textDark },
  totalPrice: { fontSize: 18, color: Colors.primary, fontWeight: 'bold' },
  
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  reorderBtn: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  reorderText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  
  // Style cho Empty State
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  emptyText: { fontSize: 16, color: Colors.textLight, marginTop: 15, marginBottom: 25 },
  shopNowBtn: { backgroundColor: Colors.primary, paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25 },
  shopNowText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});