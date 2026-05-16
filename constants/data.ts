// constants/data.ts

export const products = [
  // ================= LAPTOP GAMING (Đã đủ 3 món) =================
  { 
    id: '1', name: 'ROG Strix G16', brand: 'ASUS', specs: 'i9-13980HX, 16GB, RTX 4070', price: 1649.50, 
    category: 'Laptop Gaming', image: require('../assets/images/rog_strix.png'),
    description: 'Cỗ máy chiến game thực thụ với hệ thống tản nhiệt thông minh và màn hình 240Hz.'
  },
  { 
    id: '2', name: 'Razer Blade 14', brand: 'Razer', specs: 'Ryzen 9 7940HS, RTX 4060', price: 1999.99, 
    category: 'Laptop Gaming', image: require('../assets/images/razer_blade.png'),
    description: 'Laptop gaming 14 inch mạnh mẽ nhất thế giới với thiết kế CNC tinh xảo.'
  },
  { 
    id: '3', name: 'MSI Cyborg 15', brand: 'MSI', specs: 'i7-12650H, 16GB, RTX 4060', price: 1199.00, 
    category: 'Laptop Gaming', image: require('../assets/images/rog_strix.png'), // Dùng tạm ảnh ROG
    description: 'Thiết kế xuyên thấu độc đáo, hiệu năng vượt trội trong tầm giá.'
  },

  // ================= MACBOOK & IMAC =================
  { 
    id: '4', name: 'MacBook Pro M3', brand: 'Apple', specs: 'M3 Chip, 16GB, 512GB SSD', price: 1599.00, 
    category: 'MacBook & iMac', image: require('../assets/images/macbook_m3.png'),
    description: 'Sức mạnh vượt giới hạn với chip M3 thế hệ mới.'
  },
  { 
    id: '5', name: 'MacBook Air 13" M4', brand: 'Apple', specs: 'Chip M4, 16GB RAM', price: 1199.00, 
    category: 'MacBook & iMac', image: require('../assets/images/macbook ipad/MacBook Air 13 inch M4.jpg'),
    description: 'Thiết kế không quạt tĩnh lặng tuyệt đối.'
  },
  { 
    id: '6', name: 'MacBook Pro 16" M5 Max', brand: 'Apple', specs: 'Chip M5 Max, 64GB RAM', price: 3499.00, 
    category: 'MacBook & iMac', image: require('../assets/images/macbook ipad/MacBook Pro 16 inch M5 Max 2026.jpg'),
    description: 'Cỗ máy trạm di động tối thượng từ tương lai.'
  },
  { 
    id: '7', name: 'MacBook Pro 13" (2022)', brand: 'Apple', specs: 'Chip M2, 8GB RAM', price: 999.00, 
    category: 'MacBook & iMac', image: require('../assets/images/macbook ipad/MacBook Pro 2022 13 inch.jpg'),
    description: 'Chiếc MacBook Pro quốc dân với Touch Bar huyền thoại.'
  },
  { 
    id: '8', name: 'iPad Pro 13" M4', brand: 'Apple', specs: 'Màn hình OLED, Chip M4', price: 1299.00, 
    category: 'MacBook & iMac', image: require('../assets/images/macbook ipad/iPad Pro 13 inch.jpg'),
    description: 'Màn hình Ultra Retina XDR tuyệt đẹp kết hợp độ mỏng không tưởng.'
  },
  { 
    id: '9', name: 'iPad Pro 13" M5', brand: 'Apple', specs: 'Màn hình OLED, Chip M5', price: 1499.00, 
    category: 'MacBook & iMac', image: require('../assets/images/macbook ipad/iPad Pro M5 13 inch.jpg'),
    description: 'Phiên bản nâng cấp vi xử lý của dòng iPad Pro, hỗ trợ AI.'
  },

  // ================= MÁY TRẠM ĐỒ HỌA (Đã bổ sung cho đủ 3 món) =================
  { 
    id: '10', name: 'ThinkPad X1 Carbon', brand: 'Lenovo', specs: 'Ultra 5, 16GB, 512GB SSD', price: 1450.00, 
    category: 'Máy trạm Đồ họa', image: require('../assets/images/thinkpad_x1.png'),
    description: 'Biểu tượng của dòng laptop doanh nhân với độ bền chuẩn quân đội.'
  },
  { 
    id: '11', name: 'HP ZBook Firefly 14', brand: 'HP', specs: 'Ryzen 7 Pro, 32GB RAM', price: 1650.00, 
    category: 'Máy trạm Đồ họa', image: require('../assets/images/thinkpad_x1.png'), // Dùng tạm ảnh Thinkpad
    description: 'Máy trạm di động siêu mỏng nhẹ dành cho kỹ sư và dân thiết kế.'
  },
  { 
    id: '12', name: 'Dell Precision 5570', brand: 'Dell', specs: 'i7-12800H, Quadro A1000', price: 2100.00, 
    category: 'Máy trạm Đồ họa', image: require('../assets/images/dell_xps.png'), // Dùng tạm ảnh XPS
    description: 'Sức mạnh đồ họa chuyên nghiệp ẩn trong thiết kế thanh lịch.'
  },

  // ================= VĂN PHÒNG - HỌC TẬP =================
  { 
    id: '13', name: 'Dell XPS 15 9530', brand: 'Dell', specs: 'i7-13700H, 32GB, RTX 4060', price: 1899.00, 
    category: 'Văn phòng - Học tập', image: require('../assets/images/dell_xps.png'),
    description: 'Sự kết hợp hoàn hảo giữa thiết kế mỏng nhẹ và hiệu năng.'
  },
  { 
    id: '14', name: 'Dell XPS 15 9570', brand: 'Dell', specs: 'Core i7-8750H, 16GB RAM', price: 850.00, 
    category: 'Văn phòng - Học tập', image: require('../assets/images/vanphong_hoctap/Dell XPS 15 9570 Core i7.jpg'),
    description: 'Thiết kế sang trọng với viền màn hình InfinityEdge siêu mỏng.'
  },
  { 
    id: '15', name: 'LG Gram 17 2024', brand: 'LG', specs: 'Ultra 7, 16GB, 1TB SSD', price: 1399.00, 
    category: 'Văn phòng - Học tập', image: require('../assets/images/lg_gram.png'),
    description: 'Siêu nhẹ, màn hình 17 inch khổng lồ.'
  },
  { 
    id: '16', name: 'Xiaomi Pad 8', brand: 'Xiaomi', specs: 'Snapdragon 8 Gen 3, 144Hz', price: 450.00, 
    category: 'Văn phòng - Học tập', image: require('../assets/images/macbook ipad/Xiaomi Pad 8.jpg'),
    description: 'Máy tính bảng Android giải trí cực đỉnh với màn hình tần số quét cao.'
  },

  // ================= LINH KIỆN PC =================
  { 
    id: '17', name: 'CPU Intel Core i9 14900KF', brand: 'Intel', specs: '24 Nhân, 32 Luồng, 6.0 GHz', price: 569.00, 
    category: 'Linh kiện PC', image: require('../assets/images/maytramdohoa/Core i9 14900KF.jpg'),
    description: 'Quái thú hiệu năng thế hệ 14 từ Intel.'
  },
  { 
    id: '18', name: 'CPU AMD Ryzen 9 7950X', brand: 'AMD', specs: '16 Nhân, 32 Luồng', price: 599.00, 
    category: 'Linh kiện PC', image: require('../assets/images/linhkien/CPU AMD Ryzen 9.jpg'),
    description: 'Bộ vi xử lý kiến trúc Zen 4 mạnh mẽ nhất.'
  },
  { 
    id: '19', name: 'RAM Kingston Fury 16GB', brand: 'Kingston', specs: 'DDR5 5200MHz, RGB', price: 65.00, 
    category: 'Linh kiện PC', image: require('../assets/images/linhkien/RAM Kingston Fury 16 GB.jpg'),
    description: 'Bộ nhớ RAM chuẩn DDR5 thế hệ mới.'
  },
  { 
    id: '20', name: 'Tản nhiệt JONSBO', brand: 'Jonsbo', specs: 'Tháp đôi, Quạt 120mm RGB', price: 25.00, 
    category: 'Linh kiện PC', image: require('../assets/images/linhkien/Tan nhiet khi JONSBO.jpg'),
    description: 'Giải pháp tản nhiệt tối ưu cho các dòng CPU tầm trung.'
  },

  // ================= PHỤ KIỆN GAMING (Hàng mới về) =================
  // ================= PHỤ KIỆN GAMING (Giữ nguyên tên file dài, chỉ bỏ dấu) =================
  { 
    id: '21', name: 'Chuột Aula S12 Pro', brand: 'Aula', specs: '10000 DPI, LED RGB', price: 15.00, 
    category: 'Phụ kiện Gaming', image: require('../assets/images/phukien/Chuot gaming co day Aula S12Pro.jpg'),
    description: 'Thiết kế công thái học ôm sát tay, switch siêu bền.'
  },
  { 
    id: '22', name: 'Loa Edifier G1500 Max', brand: 'Edifier', specs: 'Bluetooth 5.3, 30W', price: 85.00, 
    category: 'Phụ kiện Gaming', image: require('../assets/images/phukien/Loa Edifier G1500 Max.jpg'),
    description: 'Hệ thống loa 2.1 với âm trầm cực sâu.'
  },
  { 
    id: '23', name: 'Mic Rode NT-USB+', brand: 'Rode', specs: 'Condenser, Lọc ồn DSP', price: 149.00, 
    category: 'Phụ kiện Gaming', image: require('../assets/images/phukien/Microphone Rode NT-USB+.jpg'),
    description: 'Thu âm chuẩn Studio. Hoàn hảo cho Streamer, Podcaster.'
  },
  { 
    id: '24', name: 'Tai nghe Edifier GX', brand: 'Edifier', specs: 'Hi-Res Audio, 50mm Titan', price: 95.00, 
    category: 'Phụ kiện Gaming', image: require('../assets/images/phukien/Tai nghe Edifier GX.jpg'),
    description: 'Tái tạo âm thanh vòm 7.1 chi tiết. Micro tháo rời tiện lợi.'
  },
  { 
    id: '25', name: 'Ổ cứng Orico 1TB', brand: 'Orico', specs: 'SSD Type-C 3.2 Gen2', price: 75.00, 
    category: 'Phụ kiện Gaming', image: require('../assets/images/phukien/O cung di dong Orico.jpg'),
    description: 'Giải pháp lưu trữ tốc độ cao, siêu mỏng nhẹ dễ mang theo.'
  },
  { 
    id: '26', name: 'Phím DareU EK75 Pro', brand: 'DareU', specs: 'Gasket Mount, Hot-swap', price: 45.00, 
    category: 'Phụ kiện Gaming', image: require('../assets/images/phukien/Ban Phim Co Bluetooth DareU EK75 Pro.jpg'),
    description: 'Bàn phím cơ layout 75% gõ cực êm, đa kết nối.'
  }
];