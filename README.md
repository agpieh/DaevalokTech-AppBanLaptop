# Thông tin sinh viên
- **Họ và tên:** Trần Đại Hiệp
- **Mã sinh viên:** 21810310632


1. AsyncStorage hoạt động như thế nào?
AsyncStorage là một hệ thống lưu trữ dữ liệu dạng Key-Value (Cặp Khóa-Giá trị) không đồng bộ (asynchronous) và không mã hóa. Nó lưu trữ dữ liệu trực tiếp trên bộ nhớ vật lý của thiết bị di động (ổ cứng). Dữ liệu thường được chuyển đổi thành chuỗi bằng JSON.stringify() trước khi lưu bằng setItem() và được giải mã bằng JSON.parse() sau khi đọc lên bằng getItem().

2. Vì sao dùng AsyncStorage thay vì biến state?
Biến state (useState) được lưu trong bộ nhớ RAM, nghĩa là vòng đời của nó chỉ tồn tại khi ứng dụng đang chạy. Khi người dùng tắt hẳn app (kill app) hoặc reload, toàn bộ RAM sẽ bị giải phóng và state sẽ mất sạch dữ liệu. Ngược lại, AsyncStorage lưu dữ liệu xuống bộ nhớ vật lý, giúp dữ liệu tồn tại vĩnh viễn (persistence) vượt qua các phiên sử dụng, cho đến khi bị xóa chủ động bằng hàm removeItem().

3. So sánh với Context API?

Mục đích: Context API dùng để chia sẻ dữ liệu (state) giữa nhiều màn hình/component khác nhau trong lúc ứng dụng đang mở (tránh prop drilling). AsyncStorage dùng để lưu trữ dữ liệu lâu dài qua nhiều lần đóng/mở app.

Tính bền vững: Context API mất dữ liệu khi kill app. AsyncStorage giữ lại dữ liệu khi kill app.

Thực tế: Trong dự án thực tế, hai công cụ này bù trừ cho nhau. Khi mở app, ta dùng AsyncStorage để đọc dữ liệu từ ổ cứng lên, sau đó nạp vào Context API để toàn bộ ứng dụng có thể sử dụng mượt mà mà không cần gọi lại ổ cứng nhiều lần.

anh 1: 21810310632_01_login.png 
![alt text](<New folder/21810310632_01_login.png>)
anh 2: 21810310632_02_autologin.png 
![alt text](<New folder/21810310632_02_autologin.png>)
anh 3: 21810310632_03_logout.png 
![alt text](<New folder/21810310632_03_logout.png>)
anh 4: 21810310632_04_gio_hang.png 
![alt text](<New folder/21810310632_04_gio_hang.png>)
anh 5: 21810310632_05_kill_app_gio_hang_con.png 
![alt text](<New folder/21810310632_05_kill_app_gio_hang_con.png>)
anh 6: 21810310632_06_thay_doi_so_luong.png 
![alt text](<New folder/21810310632_06_thay_doi_so_luong.png>)
anh 7: 21810310632_07_dat_hang_thanh_cong.png 
![alt text](<New folder/21810310632_07_dat_hang_thanh_cong.png>)
anh 8: 21810310632_08_danh_sach_don_hang.png 
![alt text](<New folder/21810310632_08_danh_sach_don_hang.png>)
anh 9: 21810310632_09_orders_reload.png ![alt text](<New folder/21810310632_09_orders_reload.png>)