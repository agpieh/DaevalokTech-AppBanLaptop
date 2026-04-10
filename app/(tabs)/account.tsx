import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

const AccountItem = ({ icon, title }: { icon: string; title: string }) => (
  <TouchableOpacity style={styles.itemRow}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon as any} size={22} color={Colors.textDark} />
      <Text style={styles.itemTitle}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={Colors.textDark} />
  </TouchableOpacity>
);

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={require('../../assets/images/User-1.jpg')} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.nameText}>Afsar Hossen</Text>
              <Ionicons name="pencil" size={16} color={Colors.primary} />
            </View>
            <Text style={styles.emailText}>imsorawo@awdad.com</Text>
          </View>
        </View>

        {/* List Items */}
        <View style={styles.listContainer}>
          <AccountItem icon="bag-handle-outline" title="Orders" />
          <AccountItem icon="card-outline" title="My Details" />
          <AccountItem icon="location-outline" title="Delivery Address" />
          <AccountItem icon="wallet-outline" title="Payment Methods" />
          <AccountItem icon="gift-outline" title="Promo Cord" />
          <AccountItem icon="notifications-outline" title="Notifications" />
          <AccountItem icon="help-circle-outline" title="Help" />
          <AccountItem icon="information-circle-outline" title="About" />
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={22} color={Colors.primary} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingTop: 40 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', padding: 25, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  avatar: { width: 64, height: 64, borderRadius: 27 },
  profileInfo: { marginLeft: 20 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  nameText: { fontSize: 20, fontWeight: 'bold', color: Colors.textDark, marginRight: 5 },
  emailText: { fontSize: 16, color: Colors.textLight },
  listContainer: { marginTop: 10 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, marginHorizontal: 25, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  itemTitle: { fontSize: 18, fontWeight: '600', color: Colors.textDark, marginLeft: 15 },
  logoutButton: { flexDirection: 'row', backgroundColor: '#F2F3F2', height: 67, borderRadius: 19, marginHorizontal: 25, marginTop: 40, marginBottom: 40, justifyContent: 'center', alignItems: 'center' },
  logoutText: { color: Colors.primary, fontSize: 18, fontWeight: 'bold', marginLeft: 10 }
});