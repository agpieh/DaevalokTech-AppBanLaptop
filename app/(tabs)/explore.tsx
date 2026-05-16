import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

// 👉 Danh mục máy tính tiếng Việt
const categories = [
  // Dùng ROG Strix làm đại diện cho Laptop Gaming (Chuẩn ngầu)
  { id: '1', name: 'Laptop Gaming', image: require('../../assets/images/rog_strix.png') }, 
  
  // Dùng MacBook M3 làm đại diện cho hệ sinh thái Apple
  { id: '2', name: 'MacBook & iMac', image: require('../../assets/images/macbook_m3.png') },
  
  // Dùng ThinkPad X1 siêu bền bỉ làm đại diện cho Máy trạm
  { id: '3', name: 'Máy trạm Đồ họa', image: require('../../assets/images/thinkpad_x1.png') },
  
  // Dùng LG Gram siêu mỏng nhẹ làm đại diện cho Văn phòng
  { id: '4', name: 'Văn phòng - Học tập', image: require('../../assets/images/lg_gram.png') },
  
  // Dùng hộp CPU AMD Ryzen 9 cực chiến làm đại diện cho Linh kiện
  { id: '5', name: 'Linh kiện PC', image: require('../../assets/images/linhkien/CPU AMD Ryzen 9.jpg') },
  
  // Dùng Tai nghe Edifier hầm hố làm đại diện cho Phụ kiện
  { id: '6', name: 'Phụ kiện Gaming', image: require('../../assets/images/phukien/Tai nghe Edifier GX.jpg') },
];

export default function ExploreScreen() {
  const router = useRouter();

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.cardContainer}
      activeOpacity={0.7}
      // Ví dụ: Bấm vào Phụ kiện (id 6) thì bay sang trang danh sách tương ứng
      onPress={() => router.push(`/category/${item.name}` as any)}    >
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
        {/* 👉 Thêm Overlay để tên danh mục dễ đọc trên nền ảnh */}
        <View style={styles.overlay}>
           <Text style={styles.categoryName}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tìm kiếm sản phẩm</Text>
      </View>

      {/* Thay vì dùng TextInput, mình dùng TouchableOpacity để bấm cái là bay sang trang Search luôn */}
      <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/search')}>
        <Ionicons name="search" size={22} color={Colors.textLight} />
        <Text style={[styles.searchInput, { color: Colors.textLight }]}>
          Tìm Laptop, linh kiện...
        </Text>
      </TouchableOpacity>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        numColumns={2} 
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row} 
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  
  header: { alignItems: 'center', marginTop: 45, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.textDark },
  
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F3F2', borderRadius: 15, paddingHorizontal: 15, height: 50, marginHorizontal: 20, marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: Colors.textDark },
  
  listContent: { paddingHorizontal: 20, paddingBottom: 100 }, // Để paddingBottom cao tránh bị che bởi TabBar
  row: { justifyContent: 'space-between', marginBottom: 15 },
  
  cardContainer: { 
    width: '47%', 
    height: 200, 
    borderRadius: 18, 
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  cardImage: { 
    width: '100%', 
    height: '100%' 
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
    backgroundColor: 'rgba(0,0,0,0.4)', // Làm tối phía dưới để nổi bật chữ
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  categoryName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});