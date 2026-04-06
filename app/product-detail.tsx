import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router'; // 👉 Thêm useLocalSearchParams
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { products } from '../constants/data'; // 👉 Import kho dữ liệu

export default function ProductDetailScreen() {
  const router = useRouter();
  
  // 👉 1. Lấy cái ID từ đường link truyền sang
  const { id } = useLocalSearchParams(); 

  // 👉 2. Tìm sản phẩm trong kho data.ts có id trùng khớp
  const product = products.find(p => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // 👉 3. BẢO VỆ CHỐNG SẬP APP: Nếu không tìm thấy sản phẩm (ví dụ truy cập lỗi), báo lỗi luôn
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
          
          {/* 👉 Thay Ảnh động */}
          <Image source={product.image} style={styles.productImage} resizeMode="contain" />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.titleRow}>
            {/* 👉 Thay Tên động */}
            <Text style={styles.productTitle}>{product.name}</Text>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
              <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color={isFavorite ? "#F3603F" : Colors.textLight} />
            </TouchableOpacity>
          </View>
          {/* 👉 Thay Trọng lượng động */}
          <Text style={styles.productWeight}>{product.weight}</Text>

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
            {/* 👉 Thay Giá động */}
            <Text style={styles.price}>${product.price}</Text>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.expandableSection}>
            <Text style={styles.sectionTitle}>Product Detail</Text>
            <Ionicons name="chevron-down" size={24} color={Colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.description}>
            Đây là mô tả chi tiết của {product.name}. Ăn rất ngon và bổ dưỡng, mua ngay kẻo lỡ!
          </Text>

          <View style={styles.divider} />
          {/* ... Các phần review, nutrition giữ nguyên ... */}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.basketButton} onPress={() => alert(`Đã thêm ${quantity} hộp ${product.name} vào giỏ!`)}>
          <Text style={styles.basketButtonText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ... styles giữ nguyên không đổi ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingTop: 40 },
  scrollContent: { paddingBottom: 100 }, 
  imageHeaderContainer: { backgroundColor: '#F2F3F2', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, paddingBottom: 30, marginBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  iconButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  productImage: { width: '100%', height: 200, marginTop: 20 },
  detailsContainer: { paddingHorizontal: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.textDark, flex: 1, marginRight: 10 },
  productWeight: { fontSize: 16, color: Colors.textLight, marginTop: 5, marginBottom: 25 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  qtyBox: { width: 45, height: 45, borderRadius: 15, borderWidth: 1, borderColor: '#E2E2E2', justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 },
  qtyText: { fontSize: 18, fontWeight: 'bold', color: Colors.textDark },
  price: { fontSize: 24, fontWeight: 'bold', color: Colors.textDark },
  divider: { height: 1, backgroundColor: '#E2E2E2', marginBottom: 15 },
  expandableSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark },
  description: { fontSize: 14, color: Colors.textLight, lineHeight: 22, marginBottom: 15 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 30, paddingTop: 10, backgroundColor: Colors.white },
  basketButton: { backgroundColor: Colors.primary, width: '100%', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  basketButtonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' }
});