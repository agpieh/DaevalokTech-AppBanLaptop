import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER: '@user_data',
  CART: '@cart_data',
  ORDERS: '@orders_data'
};

export const storageService = {
  // --- 1. AUTHENTICATION ---
  saveUser: async (userData) => {
    try {
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },
  getUser: async () => {
    try {
      const user = await AsyncStorage.getItem(KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },
  removeUser: async () => {
    try {
      // Xóa user và xóa luôn giỏ hàng cho sạch sẽ khi logout
      await AsyncStorage.removeItem(KEYS.USER);
      await AsyncStorage.removeItem(KEYS.CART); 
    } catch (error) {
      console.error('Error removing user:', error);
    }
  },

  // --- 2. CART ---
  saveCart: async (cartItems) => {
    try {
      await AsyncStorage.setItem(KEYS.CART, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  },
  getCart: async () => {
    try {
      const cart = await AsyncStorage.getItem(KEYS.CART);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  },

  // --- 3. ORDERS ---
  saveOrder: async (newOrder) => {
    try {
      const existingOrders = await storageService.getOrders();
      const updatedOrders = [newOrder, ...existingOrders]; // Đẩy đơn mới lên đầu
      await AsyncStorage.setItem(KEYS.ORDERS, JSON.stringify(updatedOrders));
    } catch (error) {
      console.error('Error saving order:', error);
    }
  },
  getOrders: async () => {
    try {
      const orders = await AsyncStorage.getItem(KEYS.ORDERS);
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  }
};