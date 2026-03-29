import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

// 👉 Dữ liệu giả lập: Đã bỏ hoàn toàn thuộc tính color và borderColor dư thừa
const categories = [
  { id: '1', name: 'Frash Fruits\n& Vegetable', color: 'rgba(83, 177, 117, 0.1)', borderColor: 'rgba(83, 177, 117, 0.7)', image: require('../../assets/images/beef bone.png') }, // Tạm dùng logo, bạn nhớ thay ảnh đúng
  { id: '2', name: 'Cooking Oil\n& Ghee', color: 'rgba(248, 164, 76, 0.1)', borderColor: 'rgba(248, 164, 76, 0.7)', image: require('../../assets/images/beef bone-1.png') },
  { id: '3', name: 'Meat & Fish', color: 'rgba(247, 165, 147, 0.1)', borderColor: 'rgba(247, 165, 147, 0.7)', image: require('../../assets/images/beef bone-5.png') },
  { id: '4', name: 'Bakery & Snacks', color: 'rgba(211, 176, 224, 0.1)', borderColor: 'rgba(211, 176, 224, 0.7)', image: require('../../assets/images/beef bone-2.png') },
  { id: '5', name: 'Dairy & Eggs', color: 'rgba(253, 229, 152, 0.1)', borderColor: 'rgba(253, 229, 152, 0.7)', image: require('../../assets/images/beef bone-6.png') },
  { id: '6', name: 'Beverages', color: 'rgba(183, 223, 245, 0.1)', borderColor: 'rgba(183, 223, 245, 0.7)', image: require('../../assets/images/beef bone-3.png') },
];



export default function ExploreScreen() {
  const router = useRouter();

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity 
      // 👉 SỬA: Xóa bỏ phần logic dynamic style color
      style={styles.cardContainer}
      activeOpacity={0.7}
      // Vẫn giữ logic: Bấm vào ô có id 6 (Beverages) thì bay sang màn beverage
      onPress={() => item.id === '6' ? router.push('/beverage') : alert(`Bạn chọn danh mục ${item.id}`)}
    >
      {/* 👉 SỬA: Đổi resizeMode="contain" sang "cover" để ảnh lấp đầy hoàn toàn */}
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Products</Text>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={22} color={Colors.textLight} />
        <TextInput style={styles.searchInput} placeholder="Search Store" placeholderTextColor={Colors.textLight} />
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        numColumns={2} // Ép chia làm 2 cột
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row} // Khoảng cách giữa 2 ô trên cùng 1 hàng
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  
  header: { alignItems: 'center', marginTop: 45, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: Colors.textDark },
  
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F3F2', borderRadius: 15, paddingHorizontal: 15, height: 50, marginHorizontal: 20, marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: Colors.textDark },
  
  listContent: { paddingHorizontal: 20, paddingBottom: 30 },
  row: { justifyContent: 'space-between', marginBottom: 15 }, // Đẩy 2 cột dạt ra 2 bên mép
  
  // 👉 SỬA: Bố cục của ô chứa ảnh
  cardContainer: { 
    width: '47%', 
    height: 180, // Chiều cao cố định cho ô
    borderRadius: 18, 
    borderWidth: 1, // 👉 Bỏ khung viền (border) cũ
    overflow: 'hidden', // 👉 QUAN TRỌNG: Ép ảnh phải bo góc theo cái thẻ, không cho ảnh phóng to quá mép thẻ
    padding: 0, // 👉 Bỏ padding bên trong (để ảnh lấp đầy hoàn toàn)
    // alignItems/justifyContent: 'center' không còn cần thiết nữa vì ảnh đã lấp đầy rồi
  },
  cardImage: { 
    width: '100%', 
    height: '100%' // Ảnh chiếm 100% diện tích thẻ parent
  }, 
});