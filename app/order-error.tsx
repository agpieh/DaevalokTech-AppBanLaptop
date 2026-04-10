import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

export default function OrderError() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/image 13.png')} style={styles.image} />
      <Text style={styles.title}>Oops! Order Failed</Text>
      <Text style={styles.desc}>Something went wrong. Please try again later.</Text>
      <TouchableOpacity style={styles.mainButton} onPress={() => router.back()}>
        <Text style={styles.mainButtonText}>Please Try Again</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(tabs)')}>
        <Text style={styles.backText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 25 },
  image: { width: 250, height: 220, marginBottom: 40, resizeMode: 'contain' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  desc: { fontSize: 16, color: Colors.textLight, textAlign: 'center', marginBottom: 50 },
  mainButton: { backgroundColor: Colors.primary, width: '100%', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  mainButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  backText: { fontSize: 18, fontWeight: 'bold', color: Colors.textDark }
});