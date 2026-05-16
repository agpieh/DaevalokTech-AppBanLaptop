import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { products } from '../../constants/data';

export default function CategoryProductsScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams(); 

  const categoryName = Array.isArray(name) ? name[0] : name;

  const filteredProducts = products.filter(product => product.category === categoryName);

  const renderProduct = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.cardContainer}
      activeOpacity={0.8}
      onPress={() => router.push(`/product-detail?id=${item.id}` as any)}
    >
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.cardSpecs} numberOfLines={1}>{item.specs}</Text>
      <Text style={styles.cardPrice}>
        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * 25000)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={Colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <View style={{ width: 28 }}></View>
      </View>

      {filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cube-outline" size={80} color={Colors.textLight} />
          <Text style={styles.emptyText}>Chưa có sản phẩm nào trong mục này</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 15 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.textDark },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: Colors.textLight, marginTop: 20 },
  listContent: { paddingHorizontal: 20, paddingBottom: 50 },
  row: { justifyContent: 'space-between', marginBottom: 15 },
  cardContainer: { width: '47%', padding: 12, backgroundColor: Colors.white, borderRadius: 15, borderWidth: 1, borderColor: '#E2E2E2' },
  cardImage: { width: '100%', height: 100, marginBottom: 10 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: Colors.textDark, marginBottom: 5, height: 40 },
  cardSpecs: { fontSize: 12, color: Colors.textLight, marginBottom: 10 },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: Colors.primary },
});