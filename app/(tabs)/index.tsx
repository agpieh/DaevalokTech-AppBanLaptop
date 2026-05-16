import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react'; // 👉 Thêm 3 hàm này
import { Alert, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { products } from '../../constants/data';
import { storageService } from '../../services/storageService';

// Tự động tính toán chiều rộng của Slider
const screenWidth = Dimensions.get('window').width;
const bannerWidth = screenWidth - 40; 

const formatCurrency = (priceInUSD: number) => {
  const priceInVND = priceInUSD * 25000;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceInVND);
};

// ================= COMPONENT THẺ SẢN PHẨM =================
const ProductCard = ({ item }: any) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    try {
      let currentCart = await storageService.getCart();
      const existingItemIndex = currentCart.findIndex((cartItem: any) => cartItem.id === item.id);

      if (existingItemIndex >= 0) {
        currentCart[existingItemIndex].quantity += 1;
      } else {
        currentCart.push({ ...item, quantity: 1 });
      }
      await storageService.saveCart(currentCart);
      Alert.alert("Thành công", `Đã thêm ${item.name} vào giỏ hàng!`);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể thêm vào giỏ hàng.");
    }
  };

  return (
    <TouchableOpacity 
      style={styles.cardContainer} 
      activeOpacity={0.8}
      onPress={() => router.push(`/product-detail?id=${item.id}` as any)} 
    >
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.cardSpecs} numberOfLines={1}>{item.specs}</Text>
      <View style={styles.cardBottomRow}>
        <Text style={styles.cardPrice} numberOfLines={1} adjustsFontSizeToFit>{formatCurrency(item.price)}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Ionicons name="add" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const SectionHeader = ({ title, onPress }: { title: string, onPress: () => void }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.seeAllText}>Xem tất cả</Text>
    </TouchableOpacity>
  </View>
);

// ================= MÀN HÌNH CHÍNH =================
export default function HomeScreen() {
  const router = useRouter();

  // 👉 CÁC BIẾN CHO SLIDER TỰ ĐỘNG
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderProducts = products.filter(p => ['1', '6', '24'].includes(p.id));

  // 👉 MA THUẬT AUTO-PLAY (Cứ 3 giây chuyển slide 1 lần)
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % sliderProducts.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: nextIndex * bannerWidth, animated: true });
    }, 4500); // Đổi số 3000 (3s) nếu muốn nhanh/chậm hơn

    // Dọn dẹp timer để tránh lỗi bộ nhớ
    return () => clearInterval(timer);
  }, [currentIndex, sliderProducts.length]);

  // 👉 Đồng bộ vị trí nếu người dùng tự lấy tay vuốt
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / bannerWidth);
    setCurrentIndex(index);
  };

  const gamingLaptops = products.filter(p => p.category === 'Laptop Gaming');
  const macbooks = products.filter(p => p.category === 'MacBook & iMac');
  const components = products.filter(p => p.category === 'Linh kiện PC');
  const accessories = products.filter(p => p.category === 'Phụ kiện Gaming');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.headerRow}>
          <Image 
            source={require('../../assets/images/logo/logo-dark-transparent.png')} 
            style={styles.headerLogo} 
            resizeMode="contain" 
          />
          <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/search' as any)}>
            <Ionicons name="search" size={20} color={Colors.textLight} />
            <Text style={styles.searchInput} numberOfLines={1}>Tìm Laptop, Phím cơ...</Text>
          </TouchableOpacity>
        </View>

        {/* 👉 SLIDER SẢN PHẨM ĐÃ NÂNG CẤP */}
        <View style={styles.sliderWrapper}>
          <ScrollView 
            ref={scrollViewRef} // Gắn ref để điều khiển trượt
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            
            onMomentumScrollEnd={handleScroll} // Cập nhật lại khi tự vuốt
          >
            {sliderProducts.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.slideContainer, { width: bannerWidth }]}
                activeOpacity={0.9}
                onPress={() => router.push(`/product-detail?id=${item.id}` as any)} 
              >
                <View style={styles.slideInfo}>
                  <View style={styles.tagContainer}>
                    <Text style={styles.slideTag}>🔥 HOT DEAL</Text>
                  </View>
                  <Text style={styles.slideName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.slidePrice}>{formatCurrency(item.price)}</Text>
                </View>
                <Image source={item.image} style={styles.slideImg} resizeMode="contain" />
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* 👉 Chấm tròn báo hiệu Slide hiện tại (Dấu trang) */}
          <View style={styles.pagination}>
            {sliderProducts.map((_, index) => (
              <View 
                key={index} 
                style={[styles.dot, currentIndex === index ? styles.dotActive : null]} 
              />
            ))}
          </View>
        </View>

        {/* CÁC KHU VỰC SẢN PHẨM BÊN DƯỚI */}
        <SectionHeader title="Laptop Gaming Khủng" onPress={() => router.push('/category/Laptop Gaming' as any)} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {gamingLaptops.map(product => <ProductCard key={product.id} item={product} />)}
        </ScrollView>

        <SectionHeader title="MacBook & iMac" onPress={() => router.push('/category/MacBook & iMac' as any)} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {macbooks.map(product => <ProductCard key={product.id} item={product} />)}
        </ScrollView>

        <SectionHeader title="Đồ chơi Công nghệ" onPress={() => router.push('/category/Phụ kiện Gaming' as any)} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {accessories.map(product => <ProductCard key={product.id} item={product} />)}
        </ScrollView>

        <SectionHeader title="Linh kiện PC" onPress={() => router.push('/category/Linh kiện PC' as any)} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {components.map(product => <ProductCard key={product.id} item={product} />)}
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingTop: 40 },
  scrollContent: { paddingBottom: 30 },
  
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20, marginTop: 10 },
  headerLogo: { width: 80, height: 35, marginRight: 15 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F3F2', borderRadius: 12, paddingHorizontal: 15, height: 45 },
  searchInput: { marginLeft: 10, fontSize: 15, color: Colors.textLight },
  
  // 👉 Nâng cấp Style cho Slider (Box đen, nền trắng)
  sliderWrapper: { marginHorizontal: 20, marginBottom: 30, borderRadius: 15, position: 'relative' },
  slideContainer: { 
    height: 160, 
    backgroundColor: Colors.white, // Nền trắng
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15,
    borderWidth: 2,           // Viền đen dày
    borderColor: '#111',      // Màu viền đen
    borderRadius: 15,
  },
  slideInfo: { flex: 1, justifyContent: 'center' },
  tagContainer: { backgroundColor: '#111', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 10 },
  slideTag: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  slideName: { color: '#111', fontSize: 18, fontWeight: 'bold', marginBottom: 8, lineHeight: 24 }, // Chữ đen
  slidePrice: { color: Colors.primary, fontSize: 16, fontWeight: 'bold' },
  slideImg: { width: 130, height: 130, marginLeft: 10 },
  
  // 👉 Style cho các chấm tròn
  pagination: { position: 'absolute', bottom: 10, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D9D9D9', marginHorizontal: 4 },
  dotActive: { width: 20, backgroundColor: '#111' }, // Chấm đen dài báo hiệu slide hiện tại

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginBottom: 15 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.textDark },
  seeAllText: { fontSize: 16, color: Colors.primary, fontWeight: '600' },
  horizontalScroll: { paddingLeft: 20, marginBottom: 30 },
  
  cardContainer: { width: 170, padding: 15, backgroundColor: Colors.white, borderRadius: 18, borderWidth: 1, borderColor: '#E2E2E2', marginRight: 15 },
  cardImage: { width: '100%', height: 100, marginBottom: 15 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: Colors.textDark, marginBottom: 5, height: 40 },
  cardSpecs: { fontSize: 13, color: Colors.textLight, marginBottom: 15 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 15, fontWeight: 'bold', color: Colors.textDark, flex: 1, marginRight: 5 },
  addButton: { width: 45, height: 45, backgroundColor: Colors.primary, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
});