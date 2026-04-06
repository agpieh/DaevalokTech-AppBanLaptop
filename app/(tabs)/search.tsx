import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// 👉 Đã sửa đường dẫn lùi 2 cấp vì file đang ở trong (tabs)
import Colors from '../../constants/Colors';
import { products } from '../../constants/data';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProduct = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.cardContainer} 
      activeOpacity={0.8}
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
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={Colors.textDark} />
        </TouchableOpacity>
        
        <View style={styles.searchBar}>
          <Ionicons name="search" size={22} color={Colors.textLight} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search Store" 
            placeholderTextColor={Colors.textLight}
            autoFocus={true} 
            value={searchQuery}
            onChangeText={setSearchQuery} 
          />
          {/* 👉 ĐÃ SỬA LỖI SẬP APP: Dùng toán tử 3 ngôi (? : null) thay vì && */}
          {searchQuery.length > 0 ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.textLight} />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity onPress={() => router.push('/filter')} style={styles.filterButton}>
          <Ionicons name="options-outline" size={28} color={Colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* 👉 Cũng dùng toán tử 3 ngôi ở đây cho an toàn tuyệt đối */}
      {filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingTop: 40 },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginBottom: 20 },
  backButton: { marginRight: 10 },
  filterButton: { marginLeft: 10 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F3F2', borderRadius: 15, paddingHorizontal: 15, height: 50 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: Colors.textDark },
  listContent: { paddingHorizontal: 20, paddingBottom: 30 },
  row: { justifyContent: 'space-between', marginBottom: 15 }, 
  cardContainer: { width: '47%', padding: 15, backgroundColor: Colors.white, borderRadius: 18, borderWidth: 1, borderColor: '#E2E2E2' },
  cardImage: { width: '100%', height: 80, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.textDark, marginBottom: 5 },
  cardWeight: { fontSize: 14, color: Colors.textLight, marginBottom: 15 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: Colors.textDark },
  addButton: { width: 45, height: 45, backgroundColor: Colors.primary, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: Colors.textLight }
});