import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Screen</Text>
      <Text style={styles.subtitle}>(Coming Soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.textDark },
  subtitle: { fontSize: 16, color: Colors.textLight, marginTop: 10 }
});