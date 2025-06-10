# Bookstore Project

Đây là dự án web bán sách online gồm backend (Node.js/Express/MongoDB) và frontend (React).

## 1. Yêu cầu môi trường

- Node.js >= 16
- Python >= 3.8
- MongoDB Atlas hoặc MongoDB local
- Yarn (hoặc npm)
- (Khuyến nghị) Sử dụng môi trường ảo Python: `venv` hoặc `conda`

## 2. Cài đặt backend

```sh
# Tạo và kích hoạt môi trường ảo Python (tùy chọn)
python -m venv myenv
source myenv/bin/activate  # (Linux/macOS)
myenv\Scripts\activate     # (Windows)

# Cài đặt thư viện Python cần thiết
pip install -r requirements.txt
# Nếu chưa có requirements.txt, cài đặt thủ công:
pip install pymongo python-dotenv

# Cài đặt thư viện Node.js
yarn install
# hoặc
npm install
```

## 3. Thiết lập biến môi trường

- Tạo file `.env` từ mẫu `.env.example` và điền thông tin kết nối MongoDB, JWT, v.v.

## 4. Load dữ liệu sách vào MongoDB

```sh
python load_books.py
```
> Script này sẽ đọc file `goodreads_bbe_dataset.csv` và import vào collection `books` trong database MongoDB.

## 5. Chạy backend

```sh
yarn dev
# hoặc
npm run dev
```
> Server sẽ chạy ở `http://localhost:3000`

## 6. Chạy frontend

```sh
cd frontend
yarn install
yarn dev
# hoặc
npm install
npm run dev
```
> Frontend sẽ chạy ở `http://localhost:5173` (theo mặc định của Vite)

---

## Tham khảo cấu trúc thư mục

```
.
├── app.js
├── controllers/
├── errors/
├── frontend/
├── middlewares/
├── models/
├── routers/
├── utils/
├── load_books.py
├── goodreads_bbe_dataset.csv
├── .env.example
└── ...
```

---

## Liên hệ

- Nếu gặp lỗi, vui lòng kiểm tra lại biến môi trường và kết nối MongoDB.
- Đóng góp hoặc báo lỗi qua GitHub Issues.
