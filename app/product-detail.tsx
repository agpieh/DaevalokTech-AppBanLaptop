import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { products } from '../constants/data';
import { storageService } from '../services/storageService';

const formatCurrency = (priceInUSD: number) => {
  const priceInVND = priceInUSD * 25000;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceInVND);
};

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 
  const product = products.find(p => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // 👉 TỰ ĐỘNG KIỂM TRA TRẠNG THÁI THẢ TIM KHI VÀO TRANG
  useFocusEffect(
    useCallback(() => {
      const checkFavoriteStatus = async () => {
        if (!product) return;
        try {
          const favorites = await storageService.getFavorites();
          // Kiểm tra xem ID của sản phẩm này đã tồn tại trong mảng yêu thích chưa
          const exists = favorites.some((fav: any) => fav.id === product.id);
          setIsFavorite(exists);
        } catch (error) {
          console.error("Lỗi kiểm tra trạng thái yêu thích:", error);
        }
      };
      checkFavoriteStatus();
    }, [product])
  );

  // 👉 HÀM XỬ LÝ THÊM/BỚT YÊU THÍCH THẬT
  const handleToggleFavorite = async () => {
    if (!product) return;
    try {
      let favorites = await storageService.getFavorites();
      const exists = favorites.some((fav: any) => fav.id === product.id);

      if (exists) {
        // Đã yêu thích rồi thì bấm lại để XÓA ra khỏi list
        favorites = favorites.filter((fav: any) => fav.id !== product.id);
        setIsFavorite(false);
      } else {
        // Chưa yêu thích thì THÊM vào list
        favorites.push(product);
        setIsFavorite(true);
      }

      // Lưu mảng mới cập nhật lại vào AsyncStorage
      await storageService.saveFavorites(favorites);
    } catch (error) {
      console.error("Lỗi xử lý yêu thích:", error);
      Alert.alert("Lỗi", "Không thể cập nhật danh sách yêu thích.");
    }
  };

  // 👉 HÀM XỬ LÝ THÊM VÀO GIỎ HÀNG THẬT
  const handleAddToCart = async () => {
    try {
      let currentCart = await storageService.getCart();
      const existingItemIndex = currentCart.findIndex((cartItem: any) => cartItem.id === product?.id);

      if (existingItemIndex >= 0) {
        currentCart[existingItemIndex].quantity += quantity;
      } else {
        currentCart.push({ ...product, quantity: quantity });
      }

      await storageService.saveCart(currentCart);
      Alert.alert("Thành công", `Đã thêm ${quantity}x ${product?.name} vào giỏ hàng!`);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể thêm vào giỏ hàng.");
    }
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{textAlign: 'center', marginTop: 50}}>Lỗi: Không tìm thấy sản phẩm!</Text>
        <TouchableOpacity onPress={() => router.back()}><Text style={{color: 'blue', textAlign: 'center'}}>Quay lại</Text></TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageHeaderContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <Ionicons name="chevron-back" size={28} color={Colors.textDark} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-outline" size={28} color={Colors.textDark} />
            </TouchableOpacity>
          </View>
          
          <Image source={product.image} style={styles.productImage} resizeMode="contain" />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>{product.name}</Text>
            {/* 👉 ĐÃ SỬA: Gọi hàm handleToggleFavorite khi bấm nút trái tim */}
            <TouchableOpacity onPress={handleToggleFavorite}>
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={28} 
                color={isFavorite ? "#F3603F" : Colors.textLight} 
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.productBrand}>{product.brand} Official Store</Text>

          <View style={styles.priceRow}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
                <Ionicons name="remove" size={24} color={Colors.textLight} />
              </TouchableOpacity>
              <View style={styles.qtyBox}><Text style={styles.qtyText}>{quantity}</Text></View>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyBtn}>
                <Ionicons name="add" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.expandableSection}>
            <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.divider} />

          <View style={styles.expandableSection}>
            <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>
            <View style={styles.specBadge}><Text style={styles.specBadgeText}>Chính hãng</Text></View>
          </View>
          
          <View style={styles.specsTable}>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Cấu hình</Text>
              <Text style={styles.specValue}>{product.specs}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Danh mục</Text>
              <Text style={styles.specValue}>{product.category}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Bảo hành</Text>
              <Text style={styles.specValue}>12 Tháng</Text>
            </View>
          </View>

          <View style={styles.divider} />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.basketButton} onPress={handleAddToCart}>
          <Text style={styles.basketButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingTop: 40 },
  scrollContent: { paddingBottom: 100 }, 
  imageHeaderContainer: { backgroundColor: '#F2F3F2', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, paddingBottom: 30, marginBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  iconButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  productImage: { width: '100%', height: 250, marginTop: 20 }, 
  detailsContainer: { paddingHorizontal: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.textDark, flex: 1, marginRight: 10 },
  productBrand: { fontSize: 16, color: Colors.primary, fontWeight: '600', marginTop: 5, marginBottom: 25 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  qtyBox: { width: 45, height: 45, borderRadius: 15, borderWidth: 1, borderColor: '#E2E2E2', justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 },
  qtyText: { fontSize: 18, fontWeight: 'bold', color: Colors.textDark },
  price: { fontSize: 24, fontWeight: 'bold', color: Colors.textDark },
  divider: { height: 1, backgroundColor: '#E2E2E2', marginBottom: 15 },
  expandableSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark },
  specBadge: { backgroundColor: '#E1F3E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 5 },
  specBadgeText: { color: '#53B175', fontSize: 12, fontWeight: 'bold' },
  description: { fontSize: 14, color: Colors.textLight, lineHeight: 22, marginBottom: 15 },
  
  specsTable: { backgroundColor: '#F9F9F9', borderRadius: 15, padding: 15, marginBottom: 20 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  specLabel: { color: Colors.textLight, fontSize: 14 },
  specValue: { color: Colors.textDark, fontSize: 14, fontWeight: '500', textAlign: 'right', flex: 1, marginLeft: 20 },

  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 30, paddingTop: 10, backgroundColor: Colors.white },
  basketButton: { backgroundColor: Colors.primary, width: '100%', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  basketButtonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' }
});