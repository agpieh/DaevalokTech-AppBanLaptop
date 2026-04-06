import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { products } from '../../constants/data'; // 👉 1. Gọi kho dữ liệu vào

// 👉 2. Thẻ sản phẩm đã sửa chuẩn chỉ nhận { item }
const ProductCard = ({ item }: any) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.cardContainer} 
      activeOpacity={0.8}
      // Bay sang detail kèm theo cái ID của sản phẩm
      onPress={() => router.push(`/product-detail?id=${item.id}`)} 
    >
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardWeight}>{item.weight}</Text>
      <View style={styles.cardBottomRow}>
        <Text style={styles.cardPrice}>${item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// Component Thẻ Danh Mục (Groceries)
const CategoryCard = ({ name, imageSource, backgroundColor }: any) => (
  <TouchableOpacity style={[styles.categoryCard, { backgroundColor }]} activeOpacity={0.8}>
    <Image source={imageSource} style={styles.categoryImage} resizeMode="contain" />
    <Text style={styles.categoryName}>{name}</Text>
  </TouchableOpacity>
);

// Component Tiêu đề Danh mục
const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity>
      <Text style={styles.seeAllText}>See all</Text>
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  const router = useRouter();

  // 👉 Lấy giả lập 2 sản phẩm đầu làm "Exclusive Offer", 2 sản phẩm sau làm "Best Selling"
  const exclusiveOffers = products.slice(0, 2);
  const bestSellings = products.slice(2, 4);
  const groceriesProducts = products.slice(4, 6);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={20} color="#4C4F4D" />
            <Text style={styles.locationText}>Dhaka, Banassre</Text>
          </View>
        </View>

        {/* Thanh tìm kiếm: Bấm vào bay sang trang Search */}
        <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/search')}>
          <Ionicons name="search" size={22} color={Colors.textLight} />
          <Text style={[styles.searchInput, { color: Colors.textLight }]}>Search Store</Text>
        </TouchableOpacity>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={require('../../assets/images/banner.png')} style={styles.banner} resizeMode="cover" />
        </View>

        {/* Khu vực 1: Exclusive Offer */}
        <SectionHeader title="Exclusive Offer" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {/* 👉 3. Dùng .map() để tự động sinh ra thẻ thay vì gõ tay */}
          {exclusiveOffers.map(product => (
             <ProductCard key={product.id} item={product} />
          ))}
        </ScrollView>

        {/* Khu vực 2: Best Selling */}
        <SectionHeader title="Best Selling" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {bestSellings.map(product => (
             <ProductCard key={product.id} item={product} />
          ))}
        </ScrollView>

        {/* Khu vực 3: Groceries */}
        <SectionHeader title="Groceries" />
        
        {/* Dải danh mục màu mè */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <CategoryCard name="Pulses" backgroundColor="#F8EEDB" imageSource={require('../../assets/images/pulses.png')} />
          <CategoryCard name="Rice" backgroundColor="#E1F3E9" imageSource={require('../../assets/images/rice.png')} />
        </ScrollView>

        {/* 👉 THÊM ĐOẠN NÀY: Dải Thẻ Sản phẩm Tạp hóa (Đã quay trở lại!) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {groceriesProducts.map(product => (
             <ProductCard key={product.id} item={product} />
          ))}
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingTop: 40 }, // Mặc định padding top
  scrollContent: { paddingBottom: 30 },
  header: { alignItems: 'center', marginTop: 10, marginBottom: 20 },
  logo: { width: 30, height: 35, marginBottom: 10 },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 16, color: '#4C4F4D', fontWeight: '600', marginLeft: 5 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F3F2', borderRadius: 15, paddingHorizontal: 15, height: 50, marginHorizontal: 20, marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  bannerContainer: { marginHorizontal: 20, marginBottom: 30, borderRadius: 15, overflow: 'hidden' },
  banner: { width: '100%', height: 115 }, 
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginBottom: 15 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.textDark },
  seeAllText: { fontSize: 16, color: Colors.primary, fontWeight: '600' },
  horizontalScroll: { paddingLeft: 20, marginBottom: 30 },
  
  // Style Thẻ Sản Phẩm
  cardContainer: { width: 170, padding: 15, backgroundColor: Colors.white, borderRadius: 18, borderWidth: 1, borderColor: '#E2E2E2', marginRight: 15 },
  cardImage: { width: '100%', height: 80, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark, marginBottom: 5 },
  cardWeight: { fontSize: 14, color: Colors.textLight, marginBottom: 15 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: Colors.textDark },
  addButton: { width: 45, height: 45, backgroundColor: Colors.primary, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },

  // Style Thẻ Danh Mục
  categoryCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 15, borderRadius: 18, width: 250, marginRight: 15 },
  categoryImage: { width: 70, height: 70, marginRight: 15 },
  categoryName: { fontSize: 20, fontWeight: '600', color: Colors.textDark }
});