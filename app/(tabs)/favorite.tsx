import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { products } from '../../constants/data'; // 👉 Kéo dữ liệu từ kho vào

export default function FavoriteScreen() {
  const router = useRouter();

  // Giả lập danh sách yêu thích bằng cách lấy 4 sản phẩm bất kỳ từ kho dữ liệu
  const favoriteItems = products.slice(0, 4);

  // Component hiển thị từng dòng sản phẩm
  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      activeOpacity={0.7}
      onPress={() => router.push('/product-detail')} // Bấm vào sẽ bay sang trang chi tiết
    >
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemWeight}>{item.weight}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Ionicons name="chevron-forward" size={24} color={Colors.textDark} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorurite</Text>
      </View>

      <FlatList
        data={favoriteItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.divider} />} // Dòng kẻ xám giữa các item
        showsVerticalScrollIndicator={false}
      />

      {/* Nút Thêm tất cả vào giỏ hàng */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addAllButton} onPress={() => alert('Đã thêm tất cả vào giỏ hàng!')}>
          <Text style={styles.addAllText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingTop: 40 }, // 👉 Mặc định paddingTop 40
  
  header: { alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.textDark },
  
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  divider: { height: 1, backgroundColor: '#E2E2E2', marginVertical: 15 },
  
  itemContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  itemImage: { width: 60, height: 60, marginRight: 15 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark, marginBottom: 5 },
  itemWeight: { fontSize: 14, color: Colors.textLight },
  
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  itemPrice: { fontSize: 18, fontWeight: 'bold', color: Colors.textDark, marginRight: 15 },
  
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10, backgroundColor: Colors.white },
  addAllButton: { backgroundColor: Colors.primary, width: '100%', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  addAllText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' }
});