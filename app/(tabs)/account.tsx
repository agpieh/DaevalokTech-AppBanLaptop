import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { storageService } from '../../services/storageService';

const AccountItem = ({ icon, title, onPress }: { icon: string; title: string; onPress?: () => void }) => (
  <TouchableOpacity style={styles.itemRow} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon as any} size={22} color={Colors.textDark} />
      <Text style={styles.itemTitle}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
  </TouchableOpacity>
);

export default function AccountScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Tự động load thông tin user từ Storage khi mở màn hình
  useFocusEffect(
    useCallback(() => {
      const loadUserData = async () => {
        const savedUser = await storageService.getUserInfo();
        if (savedUser) {
          setUser(savedUser);
        }
      };
      loadUserData();
    }, [])
  );

  // 👉 HÀM ĐĂNG XUẤT THẬT 100%
  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn thoát khỏi ứng dụng?",
      [
        { text: "Hủy", style: "cancel" },
        { 
          text: "Đăng xuất", 
          style: "destructive",
          onPress: async () => {
            try {
              // 1. Gọi Async Storage xóa sạch thông tin User đăng nhập
              await storageService.removeUser();
              
              // 2. Set lại State về null để giao diện xóa tên ngay lập tức
              setUser(null);
              
              // 3. Đá thẳng người dùng ra màn Login bằng Email
              router.replace('/login' as any);
            } catch (error) {
              Alert.alert("Lỗi", "Không thể đăng xuất vào lúc này!");
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={require('../../assets/images/User-1.jpg')} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              {/* Hiển thị tên động, không có thì mặc định là Daevalok */}
              <Text style={styles.nameText}>{user?.name ? user.name : 'Daevalok'}</Text>
              <Ionicons name="pencil" size={16} color={Colors.primary} />
            </View>
            {/* Hiển thị email động */}
            <Text style={styles.emailText}>{user?.email ? user.email : '21810310632@epu.edu.vn'}</Text>
          </View>
        </View>

        {/* List Items - Đã cắt tỉa gọn gàng */}
        <View style={styles.listContainer}>
          <AccountItem 
            icon="bag-check-outline" 
            title="Lịch sử đơn hàng" 
            onPress={() => router.push('/orders' as any)} 
          />
          <AccountItem 
            icon="person-outline" 
            title="Thông tin cá nhân" 
            onPress={() => alert('Tính năng đang phát triển!')} 
          />
          <AccountItem 
            icon="location-outline" 
            title="Địa chỉ giao hàng" 
            onPress={() => alert('Tính năng đang phát triển!')} 
          />
          <AccountItem 
            icon="information-circle-outline" 
            title="Về Daevalok Tech" 
            onPress={() => alert('Phiên bản 1.0.0 \nĐồ án Tốt nghiệp EPU')} 
          />
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={Colors.primary} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingTop: 40 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', padding: 25, borderBottomWidth: 1, borderBottomColor: '#F2F3F2' },
  avatar: { width: 64, height: 64, borderRadius: 32 }, 
  profileInfo: { marginLeft: 20 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  nameText: { fontSize: 20, fontWeight: 'bold', color: Colors.textDark, marginRight: 8 },
  emailText: { fontSize: 14, color: Colors.textLight },
  
  listContainer: { marginTop: 10 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, marginHorizontal: 25, borderBottomWidth: 1, borderBottomColor: '#F2F3F2' },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  itemTitle: { fontSize: 16, fontWeight: '600', color: Colors.textDark, marginLeft: 15 },
  
  logoutButton: { flexDirection: 'row', backgroundColor: '#F9F9F9', height: 60, borderRadius: 15, marginHorizontal: 25, marginTop: 40, marginBottom: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#F2F3F2' },
  logoutText: { color: Colors.primary, fontSize: 16, fontWeight: 'bold', marginLeft: 10 }
});