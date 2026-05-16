import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER: '@user_data',
  CART: '@cart_data',
  ORDERS: '@orders_data',
};

export const storageService = {
  // ==============================
  // 1. AUTH (XÁC THỰC)
  // ==============================
  saveUser: async (userData: any) => {
    try {
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(userData));
    } catch (e) {
      console.error('Lỗi lưu user:', e);
    }
  },
  getUser: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEYS.USER);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.error('Lỗi đọc user:', e);
      return null;
    }
  },
  removeUser: async () => {
    try {
      await AsyncStorage.removeItem(KEYS.USER);
      // Xóa luôn giỏ hàng khi đăng xuất cho sạch
      await AsyncStorage.removeItem(KEYS.CART); 
    } catch(e) {
      console.error('Lỗi xóa user:', e);
    }
  },

  // ==============================
  // 2. CART (GIỎ HÀNG)
  // ==============================
  saveCart: async (cartItems: any) => {
    try {
      await AsyncStorage.setItem(KEYS.CART, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Lỗi lưu giỏ hàng:', e);
    }
  },
  getCart: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEYS.CART);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
      console.error('Lỗi đọc giỏ hàng:', e);
      return [];
    }
  },
  // 👉 ĐÂY LÀ HÀM BẠN ĐANG THIẾU
  clearCart: async () => {
    try {
      await AsyncStorage.removeItem(KEYS.CART);
    } catch(e) {
      console.error('Lỗi xóa giỏ hàng:', e);
    }
  },

  // ==============================
  // 3. ORDERS (ĐƠN HÀNG)
  // ==============================
  saveOrder: async (newOrder: any) => {
    try {
      // 1. Lấy dữ liệu thô từ storage trước
      const jsonValue = await AsyncStorage.getItem(KEYS.ORDERS);
      const existingOrders = jsonValue != null ? JSON.parse(jsonValue) : [];
      
      // 2. Thêm đơn mới vào đầu mảng
      const updatedOrders = [newOrder, ...existingOrders];
      
      // 3. Lưu lại
      await AsyncStorage.setItem(KEYS.ORDERS, JSON.stringify(updatedOrders));
      console.log("✅ Đã lưu đơn hàng mới vào Storage");
    } catch (e) {
      console.error('❌ Lỗi khi saveOrder:', e);
    }
  },

  getOrders: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEYS.ORDERS);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
      console.error('❌ Lỗi khi getOrders:', e);
      return [];
    }
  },
  saveUserInfo: async (userInfo: any) => {
    try {
      await AsyncStorage.setItem('USER_INFO', JSON.stringify(userInfo));
    } catch (e) {
      console.error("Lỗi lưu thông tin user", e);
    }
  },

  getUserInfo: async () => {
    try {
      const value = await AsyncStorage.getItem('USER_INFO');
      // Nếu chưa có ai đăng ký thì trả về tên mặc định cho đỡ trống
      return value ? JSON.parse(value) : { name: 'Người dùng', email: '' }; 
    } catch (e) {
      return { name: 'Người dùng', email: '' };
    }
  }
};