import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

const CheckboxItem = ({ label, isChecked, onPress }: any) => (
  <TouchableOpacity style={styles.checkboxRow} onPress={onPress} activeOpacity={0.7}>
    <Ionicons 
      name={isChecked ? "checkbox" : "square-outline"} 
      size={24} 
      color={isChecked ? Colors.primary : Colors.textLight} 
    />
    <Text style={[styles.checkboxLabel, { color: isChecked ? Colors.primary : Colors.textDark }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function FilterScreen() {
  const router = useRouter();
  
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (item: string) => {
    if (selectedFilters.includes(item)) {
      setSelectedFilters(selectedFilters.filter(f => f !== item));
    } else {
      setSelectedFilters([...selectedFilters, item]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="close" size={28} color={Colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <CheckboxItem label="Eggs" isChecked={selectedFilters.includes('Eggs')} onPress={() => toggleFilter('Eggs')} />
          <CheckboxItem label="Noodles & Pasta" isChecked={selectedFilters.includes('Noodles')} onPress={() => toggleFilter('Noodles')} />
          <CheckboxItem label="Chips & Crisps" isChecked={selectedFilters.includes('Chips')} onPress={() => toggleFilter('Chips')} />
          <CheckboxItem label="Fast Food" isChecked={selectedFilters.includes('FastFood')} onPress={() => toggleFilter('FastFood')} />
        </View>
        
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Brand</Text>
          <CheckboxItem label="Individual Collection" isChecked={selectedFilters.includes('Individual')} onPress={() => toggleFilter('Individual')} />
          <CheckboxItem label="Cocacola" isChecked={selectedFilters.includes('Cocacola')} onPress={() => toggleFilter('Cocacola')} />
          <CheckboxItem label="Ifad" isChecked={selectedFilters.includes('Ifad')} onPress={() => toggleFilter('Ifad')} />
          <CheckboxItem label="Kazi Farmas" isChecked={selectedFilters.includes('Kazi')} onPress={() => toggleFilter('Kazi')} />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.applyButton} onPress={() => router.back()}>
          <Text style={styles.applyButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingTop: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  iconButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.textDark },
  content: { flex: 1, backgroundColor: '#F2F3F2', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20, paddingTop: 30 },
  filterSection: { marginBottom: 35 },
  sectionTitle: { fontSize: 24, fontWeight: '600', color: Colors.textDark, marginBottom: 20 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  checkboxLabel: { fontSize: 16, marginLeft: 10 },
  bottomBar: { paddingHorizontal: 20, paddingBottom: 30, paddingTop: 10, backgroundColor: Colors.white },
  applyButton: { backgroundColor: Colors.primary, width: '100%', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  applyButtonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' }
});