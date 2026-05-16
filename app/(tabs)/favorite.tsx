import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { storageService } from '../../services/storageService'; // 👉 Import kho chứa thật

const formatCurrency = (priceInUSD: number) => {
  const priceInVND = priceInUSD * 25000;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceInVND);
};

export default function FavoriteScreen() {
  const router = useRouter();
  
  // 👉 Thay vì dùng biến fix chết, chuyển sang dùng State động
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]);

  // 👉 Tự động reload danh sách yêu thích THẬT từ AsyncStorage mỗi khi bồ mở tab này
  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        const data = await storageService.getFavorites();
        setFavoriteItems(data);
      };
      loadFavorites();
    }, [])
  );

  // 👉 Hàm xóa sản phẩm khỏi danh sách yêu thích
  const handleRemoveFavorite = async (id: string) => {
    const updatedFavorites = favoriteItems.filter(item => item.id !== id);
    setFavoriteItems(updatedFavorites); // Cập nhật giao diện lập tức
    await storageService.saveFavorites(updatedFavorites); // Lưu lại vào bộ nhớ máy
  };

  // 👉 Hàm thêm tất cả sản phẩm đang yêu thích vào giỏ hàng
  const handleAddAllToCart = async () => {
    if (favoriteItems.length === 0) {
      Alert.alert("Thông báo", "Danh sách yêu thích của bạn đang trống!");
      return;
    }

    try {
      // Lấy giỏ hàng hiện tại ra
      const currentCart = await storageService.getCart();
      
      // Gộp danh sách yêu thích vào giỏ hàng
      let updatedCart = [...currentCart];
      
      favoriteItems.forEach((favItem) => {
        const existingItemIndex = updatedCart.findIndex(cartItem => cartItem.id === favItem.id);
        if (existingItemIndex > -1) {
          // Nếu sản phẩm đã có trong giỏ, tăng số lượng lên 1
          updatedCart[existingItemIndex].quantity += 1;
        } else {
          // Nếu chưa có, thêm mới vào giỏ với số lượng mặc định là 1
          updatedCart.push({ ...favItem, quantity: 1 });
        }
      });

      // Lưu giỏ hàng mới
      await storageService.saveCart(updatedCart);
      Alert.alert("Thành công", "Đã thêm tất cả sản phẩm yêu thích vào giỏ hàng!");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể thêm vào giỏ hàng lúc này.");
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      activeOpacity={0.7}
      onPress={() => router.push(`/product-detail?id=${item.id}` as any)} 
    >
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.itemSpecs} numberOfLines={1}>{item.specs || item.category}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
        
        {/* 👉 Nút bỏ yêu thích (icon thùng rác nhỏ tinh tế) */}
        <TouchableOpacity 
          style={styles.removeBtn} 
          onPress={() => handleRemoveFavorite(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#FF4747" />
        </TouchableOpacity>

        <Ionicons name="chevron-forward" size={22} color={Colors.textLight} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sản phẩm yêu thích</Text>
      </View>

      {/* 👉 Xử lý UI nếu danh sách rỗng để không bị trống trải */}
      {favoriteItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={70} color="#D9D9D9" />
          <Text style={styles.emptyText}>Chưa có sản phẩm nào trong danh sách!</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.divider} />} 
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addAllButton} onPress={handleAddAllToCart}>
          <Text style={styles.addAllText}>Thêm tất cả vào giỏ hàng</Text>
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
  
  itemContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  itemImage: { width: 60, height: 60, marginRight: 15 },
  itemDetails: { flex: 1, paddingRight: 10 },
  itemName: { fontSize: 15, fontWeight: 'bold', color: Colors.textDark, marginBottom: 5 },
  itemSpecs: { fontSize: 13, color: Colors.textLight },
  
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark, marginRight: 10 },
  removeBtn: { padding: 8, marginRight: 5 }, // Style hộp bấm nút xóa
  
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10, backgroundColor: Colors.white },
  addAllButton: { backgroundColor: Colors.primary, width: '100%', height: 60, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  addAllText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
  emptyText: { fontSize: 16, color: Colors.textLight, marginTop: 15 }
});