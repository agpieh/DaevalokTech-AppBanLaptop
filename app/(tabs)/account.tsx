import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router'; // 👉 Đổi sang useFocusEffect
import React, { useCallback, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import { storageService } from '../../services/storageService';

// 👉 Thêm thuộc tính onPress để nút nào cũng bấm được
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

  // 👉 Tự động load thông tin user MỖI KHI MỞ TAB NÀY
  useFocusEffect(
    useCallback(() => {
      const loadUserData = async () => {
        const savedUser = await storageService.getUserInfo(); // Nhớ gọi đúng tên hàm này nhé
        if (savedUser) {
          setUser(savedUser);
        }
      };
      loadUserData();
    }, [])
  );

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
            // Giả định bồ đăng xuất, bay thẳng ra màn Welcome/Login
            router.replace('/login' as any); // Chỉnh lại route nếu bồ dùng tên file khác
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

        {/* List Items - Đã cắt tỉa và Việt Hóa */}
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
            onPress={() => alert('Phiên bản 1.0.0 \nĐồ án Tốt nghiệp')} 
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
  avatar: { width: 64, height: 64, borderRadius: 32 }, // Đổi borderRadius thành nửa width/height để ảnh tròn xoe
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