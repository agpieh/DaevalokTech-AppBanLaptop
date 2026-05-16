import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors';

export default function TabsLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false, // Ẩn header mặc định
        tabBarActiveTintColor: Colors.primary, // Màu xanh khi được chọn
        tabBarInactiveTintColor: Colors.textDark, // Màu đen khi không chọn
        tabBarStyle: { height: 70, paddingBottom: 15, paddingTop: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Shop', tabBarIcon: ({color}) => <Ionicons name="storefront-outline" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="explore" 
        options={{ title: 'Explore', tabBarIcon: ({color}) => <Ionicons name="search-outline" size={24} color={color} /> }} 
      />
      {/* 3 Tab dưới đây tạo tạm để cho đủ bộ khung UI */}
      <Tabs.Screen 
        name="cart" 
        options={{ title: 'Cart', tabBarIcon: ({color}) => <Ionicons name="cart-outline" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="favorite" 
        options={{ title: 'Favorite', tabBarIcon: ({color}) => <Ionicons name="heart-outline" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="account" 
        options={{ title: 'Account', tabBarIcon: ({color}) => <Ionicons name="person-outline" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{ href: null }} 
      />
    </Tabs>
  );
}