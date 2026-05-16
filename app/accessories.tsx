import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors'; // Chú ý đường dẫn lùi 1 cấp vì file này nằm ở app/

// Dữ liệu giả lập cho đồ uống
const beverages = [
  { id: '1', name: 'Diet Coke', weight: '355ml, Price', price: '1.99', image: require('../assets/images/coke.png') }, // Nhớ đổi ảnh lon Coke, Sprite...
  { id: '2', name: 'Sprite Can', weight: '325ml, Price', price: '1.50', image: require('../assets/images/sprite.png') },
  { id: '3', name: 'Apple & Grape Juice', weight: '2L, Price', price: '15.99', image: require('../assets/images/applejuice.png') },
  { id: '4', name: 'Orenge Juice', weight: '2L, Price', price: '15.99', image: require('../assets/images/orangejuice.png') },
  { id: '5', name: 'Coca Cola Can', weight: '325ml, Price', price: '4.99', image: require('../assets/images/cola.png') },
  { id: '6', name: 'Pepsi Can ', weight: '330ml, Price', price: '4.99', image: require('../assets/images/pepsi.png') },
];

export default function BeverageScreen() {
  const router = useRouter();

  // Component Thẻ Sản phẩm (Có bo góc, viền xám)
  const renderProduct = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.cardContainer} 
      activeOpacity={0.8}
      // 👉 Bấm vào bất kỳ đồ uống nào sẽ bay sang màn hình Product Detail
      onPress={() => router.push('/product-detail')}
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={28} color={Colors.textDark} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Beverages</Text>
        
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="options-outline" size={28} color={Colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* Lưới Sản phẩm */}
      <FlatList
        data={beverages}
        renderItem={renderProduct}
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
  
  // Style cho Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20 },
  iconButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.textDark },
  
  listContent: { paddingHorizontal: 20, paddingBottom: 30 },
  row: { justifyContent: 'space-between', marginBottom: 15 }, 
  
  // Style Thẻ Sản phẩm
  cardContainer: { width: '47%', padding: 15, backgroundColor: Colors.white, borderRadius: 18, borderWidth: 1, borderColor: '#E2E2E2' },
  cardImage: { width: '100%', height: 80, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark, marginBottom: 5 },
  cardWeight: { fontSize: 14, color: Colors.textLight, marginBottom: 15 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: Colors.textDark },
  addButton: { width: 45, height: 45, backgroundColor: Colors.primary, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }
});