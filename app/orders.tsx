import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { storageService } from '../services/storageService';
export default function OrdersScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);

  // Lấy danh sách đơn hàng khi mở trang
  useFocusEffect(
    useCallback(() => {
      const loadOrders = async () => {
        const data = await storageService.getOrders();
        setOrders(data);
      };
      loadOrders();
    }, [])
  );

  const renderOrderItem = ({ item }: any) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Mã đơn: {item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>
      
      <Text style={styles.itemCount}>Số lượng SP: {item.items.length} món</Text>
      
      <View style={styles.orderFooter}>
        <Text style={styles.totalText}>Tổng tiền: <Text style={styles.price}>${item.total}</Text></Text>
        <TouchableOpacity style={styles.statusBadge}>
          <Text style={styles.statusText}>Thành công</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color={Colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử Đơn hàng</Text>
        <View style={{ width: 28 }} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Chưa có đơn hàng nào.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingTop: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  listContent: { padding: 20 },
  orderCard: { backgroundColor: '#F8F8F8', borderRadius: 15, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#E2E2E2' },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  orderId: { fontSize: 16, fontWeight: 'bold' },
  orderDate: { fontSize: 14, color: 'gray' },
  itemCount: { fontSize: 15, marginBottom: 10 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E2E2E2', paddingTop: 10 },
  totalText: { fontSize: 16, fontWeight: '600' },
  price: { color: Colors.primary, fontSize: 18, fontWeight: 'bold' },
  statusBadge: { backgroundColor: '#E1F3E9', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  statusText: { color: Colors.primary, fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: 'gray' }
});