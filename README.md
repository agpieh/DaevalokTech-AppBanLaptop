## Tên đề tài: Xây dựng ứng dụng bán máy tính
## Giới thiệu hệ thống
**Daevalok Tech** là giải pháp ứng dụng di động thương mại điện tử chuyên biệt cho lĩnh vực kinh doanh laptop và phụ kiện công nghệ. Ứng dụng được xây dựng trên nền tảng di động tiên tiến, tối ưu hóa trải nghiệm người dùng (UI/UX) giúp việc tìm kiếm cấu hình, so sánh giá cả và đặt hàng trở nên nhanh chóng, mượt mà.

### Các tính năng cốt lõi của hệ thống:
* **Xác thực người dùng:** Đăng nhập, đăng ký tài khoản hệ thống động, quản lý thông tin profile.
* **Khám phá sản phẩm:** Giao diện trang chủ hiển thị danh mục laptop phân loại theo hãng, cấu hình (Specs), bộ lọc tìm kiếm thông minh.
* **Giỏ hàng toàn diện (Cart):** Thêm, bớt, cập nhật số lượng sản phẩm trực tiếp, tự động tính toán tổng tiền theo thời gian thực.
* **Danh sách yêu thích (Favorites):** Thả tim lưu trữ sản phẩm quan tâm, hỗ trợ chuyển nhanh toàn bộ list yêu thích vào giỏ hàng.
* **Thanh toán giả lập (Checkout Process):** Hỗ trợ nhiều phương thức (COD, Ví MoMo, VNPay), có màn hình xử lý giao dịch ngầm chống rò rỉ bộ nhớ (Memory Leak) và xử lý luồng hủy giao dịch chuẩn thực tế.
* **Lịch sử đơn hàng (Orders History):** Quản lý trạng thái và lưu trữ danh sách các hóa đơn đã giao dịch thành công.

---

## Danh sách thành viên & Phân công nhiệm vụ

- **Họ và tên:** Trần Đại Hiệp
- **Mã sinh viên:** 21810310632
- **Phân công nhiệm vụ** Code chính, Xây dựng hệ thống, thiết kế giao diện, Hoàn thiện hệ thống, báo cáo, hoàn thiện layout, thiết kế logo, thiết kế thanh toán, thiết kế lịch sử, trang tìm kiếm, trang chủ.

- **Họ và tên:** Vũ Đăng Tùng
- **Mã sinh viên:** 21810310537
- **Phân công nhiệm vụ** Tìm kiếm các nội dung, thiết kế trang chi tiết sản phẩm, trang yêu thích, báo cáo, quay demo.
---

## Công nghệ sử dụng
Ứng dụng được triển khai bằng các công nghệ Front-end di động hiện đại và tối ưu:
* **Framework chính:** React Native v0.7x + Hệ sinh thái **Expo (SDK 51)** giúp tối ưu hóa đa nền tảng (Android & iOS).
* **Ngôn ngữ lập trình:** **TypeScript (TSX)** bảo đảm chặt chẽ về mặt kiểu dữ liệu và hạn chế lỗi runtime.
* **Cơ chế điều hướng (Navigation):** **Expo Router** ứng dụng kiến trúc *File-based Routing* tân tiến tương tự Next.js.
* **Quản lý dữ liệu cục bộ:** **`@react-native-async-storage/async-storage`** gánh toàn bộ luồng lưu trữ giỏ hàng, user session, favorites và hóa đơn không qua server.
* **Tối ưu hiệu năng:** Cấu trúc vòng đời qua các React Hooks chuyên sâu (`useState`, `useEffect`, `useRef`, `useCallback`) kết hợp **`useFocusEffect`** để nạp lại dữ liệu động tức thì khi chuyển Tab.

---

## Hướng dẫn cài đặt & Chạy project dưới Local
## Các bước cài đặt
Bật Terminal (hoặc Command Prompt) tại thư mục dự án và chạy các lệnh sau:
 Bước 1: Cài đặt toàn bộ các thư viện phụ thuộc (node_modules)
            npm install

 Bước 2: Đồng bộ và sửa các lỗi lệch phiên bản cấu hình thư viện của Expo (nếu có)
            npx expo install --fix
Để khởi chạy ứng dụng kết nối trực tiếp với điện thoại, sử dụng lệnh xóa bộ nhớ đệm và tạo đường hầm kết nối:
            npx expo start -c --tunnel

Sau khi server Metro Bundler khởi chạy thành công:

Mở ứng dụng Expo Go trên điện thoại di động của bạn.

Dùng camera điện thoại (iOS) hoặc tính năng quét mã QR trong Expo Go (Android) để quét mã QR hiển thị trên màn hình máy tính.

Chờ ứng dụng đóng gói dữ liệu (Bundle) trong vài giây và trải nghiệm hệ thống.

## Tài khoản Demo dùng thử
Hệ thống tích hợp luồng đăng nhập động giả lập, có thể nhập tài khoản bất kỳ để test hệ thống

## Hình ảnh minh họa hệ thống
![alt text](anhDemo/z7814130118098_cad5ee4fbf89b223d9f3b0d31a46a247.jpg) ![alt text](anhDemo/z7814130129145_094ad7c178b96ad96df7f5c2d1fa618b.jpg) ![alt text](anhDemo/z7814130139729_a0856bccfc6ad3e59fa769e06af33e3c.jpg) ![alt text](anhDemo/z7814130140037_e4620b4a68c073bd770ad4b2d8405389.jpg) ![alt text](anhDemo/z7814130146391_b05ca38b9400683abc03ee5415e59a1f.jpg) ![alt text](anhDemo/z7814130153214_23efcfdf4f17d27f67d3fcbba2875585.jpg) ![alt text](anhDemo/z7814130165504_63e3bd2cc1670985eb52ae713bf90965.jpg) ![alt text](anhDemo/z7814130169653_17b3ab434e352e76b336fd7e933594b4.jpg) ![alt text](anhDemo/z7814130181978_b14d94ee2529043c45b9f97cb909aeeb.jpg) ![alt text](anhDemo/z7814130191934_62ebf0445ba9b8df37d7b1ad28dc848e.jpg) ![alt text](anhDemo/z7814130192180_3ebbc02795bb01281f53ed6a888a3b49.jpg) ![alt text](anhDemo/z7814130208885_3836f251c5264e288ff6b4abb5455cfc.jpg) ![alt text](anhDemo/z7814130212318_3abf55921517e021ffa8855cc16807b9.jpg) ![alt text](anhDemo/z7814130221963_f80339ac33d71452095d869b71d90fd4.jpg) ![alt text](anhDemo/z7814130233616_6f93bafc974d26fe564ca232fde1fa42.jpg) ![alt text](anhDemo/z7814130238859_6eb46355ee3b0efce8b246c483987559.jpg) ![alt text](anhDemo/z7814130245822_cb741c9c420d21fdc54a6314c542c31b.jpg) ![alt text](anhDemo/z7814130248962_267966eeaed27ea143bc7ccd272f54f1.jpg) [alt text](README.md)