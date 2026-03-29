import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

export default function ProductDetailScreen() {
  const router = useRouter();
  
  // State quản lý số lượng và trạng thái Thả tim
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Khu vực Nền xám chứa Header và Ảnh sản phẩm to */}
        <View style={styles.imageHeaderContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <Ionicons name="chevron-back" size={28} color={Colors.textDark} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-outline" size={28} color={Colors.textDark} />
            </TouchableOpacity>
          </View>
          
          {/* 👉 Nhớ đổi ảnh quả táo/sản phẩm thật của bạn vào đây */}
          <Image 
            source={require('../assets/images/apple.png')} 
            style={styles.productImage} 
            resizeMode="contain" 
          />
        </View>

        <View style={styles.detailsContainer}>
          {/* Tiêu đề & Nút thả tim */}
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>Naturel Red Apple</Text>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={28} 
                color={isFavorite ? "#F3603F" : Colors.textLight} 
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.productWeight}>1kg, Price</Text>

          {/* Hàng Giá & Tăng/Giảm số lượng */}
          <View style={styles.priceRow}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
                <Ionicons name="remove" size={24} color={Colors.textLight} />
              </TouchableOpacity>
              
              <View style={styles.qtyBox}>
                <Text style={styles.qtyText}>{quantity}</Text>
              </View>
              
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyBtn}>
                <Ionicons name="add" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>$4.99</Text>
          </View>

          <View style={styles.divider} />

          {/* Chi tiết sản phẩm (Product Detail) */}
          <TouchableOpacity style={styles.expandableSection}>
            <Text style={styles.sectionTitle}>Product Detail</Text>
            <Ionicons name="chevron-down" size={24} color={Colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.description}>
            Apples are nutritious. Apples may be good for weight loss. Apples may be good for your heart. As part of a healthful and varied diet.
          </Text>

          <View style={styles.divider} />

          {/* Dinh dưỡng (Nutritions) */}
          <TouchableOpacity style={styles.expandableSection}>
            <Text style={styles.sectionTitle}>Nutritions</Text>
            <View style={styles.rightRow}>
              <View style={styles.badge}><Text style={styles.badgeText}>100gr</Text></View>
              <Ionicons name="chevron-forward" size={24} color={Colors.textDark} />
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Đánh giá (Review) */}
          <TouchableOpacity style={styles.expandableSection}>
            <Text style={styles.sectionTitle}>Review</Text>
            <View style={styles.rightRow}>
              {/* Vòng lặp in ra 5 ngôi sao đỏ */}
              {[1, 2, 3, 4, 5].map(star => (
                <Ionicons key={star} name="star" size={20} color="#F3603F" />
              ))}
              <Ionicons name="chevron-forward" size={24} color={Colors.textDark} style={{ marginLeft: 10 }} />
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Nút Add To Basket nằm chết ở dưới đáy */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.basketButton} onPress={() => alert(`Đã thêm ${quantity} sản phẩm vào giỏ!`)}>
          <Text style={styles.basketButtonText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollContent: { paddingBottom: 100 }, // Để lại khoảng trống không bị nút Add to basket che mất
  
  // Vùng ảnh và header (Nền xám nhạt bo cong góc dưới)
  imageHeaderContainer: { backgroundColor: '#F2F3F2', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, paddingBottom: 30, marginBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40 },
  iconButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  productImage: { width: '100%', height: 200, marginTop: 20 },
  
  // Vùng thông tin chi tiết
  detailsContainer: { paddingHorizontal: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.textDark, flex: 1, marginRight: 10 },
  productWeight: { fontSize: 16, color: Colors.textLight, marginTop: 5, marginBottom: 25 },
  
  // Hàng số lượng và giá
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  qtyBox: { width: 45, height: 45, borderRadius: 15, borderWidth: 1, borderColor: '#E2E2E2', justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 },
  qtyText: { fontSize: 18, fontWeight: 'bold', color: Colors.textDark },
  price: { fontSize: 24, fontWeight: 'bold', color: Colors.textDark },
  
  divider: { height: 1, backgroundColor: '#E2E2E2', marginBottom: 15 },
  
  // Các mục mở rộng
  expandableSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark },
  description: { fontSize: 14, color: Colors.textLight, lineHeight: 22, marginBottom: 15 },
  
  rightRow: { flexDirection: 'row', alignItems: 'center' },
  badge: { backgroundColor: '#EBEBEB', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8, marginRight: 15 },
  badgeText: { fontSize: 12, fontWeight: '600', color: Colors.textLight },
  
  // Nút ở dưới cùng
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 30, paddingTop: 10, backgroundColor: Colors.white },
  basketButton: { backgroundColor: Colors.primary, width: '100%', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  basketButtonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' }
});