import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/books?page=${page}&limit=20`,
          {
            timeout: 30000,
          }
        );
        console.log("Response data:", response.data);
        setBooks(response.data.books || []);
        setTotalPages(Math.ceil(response.data.total / response.data.limit));
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Không thể tải danh sách sách");
      }
    };
    fetchBooks();
  }, [page]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Gọi API lấy profile nếu có endpoint /api/users/me
      axios
        .get("http://localhost:3000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          // Nếu lỗi (token hết hạn), xoá và chuyển về login
          localStorage.clear();
          navigate("/login");
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    // Nếu có route logout backend: axios.post('/api/logout')
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Cửa Hàng Sách Online</h1>
            <p className="mt-1">
              Khám phá thế giới tri thức với hàng ngàn cuốn sách!
            </p>
          </div>
          <div>
            {user ? (
              <div className="flex items-center space-x-4">
                <span>Xin chào, {user.fullName || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex space-x-4 justify-center p-4 bg-gray-100 rounded-lg shadow-md">
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-sm"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 shadow-sm"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Hãy tham gia ngay để mua sắm!
          </h2>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Sách Nổi Bật
          </h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
              {error}
            </div>
          )}
          {books.length === 0 && !error ? (
            <p className="text-center text-gray-600">Chưa có sách nào</p>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
                {books.map((book) => (
                  <Link to={`/books/${book.id}`} key={book.id}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-full">
                      <div className="w-full aspect-[3/4]">
                        <img
                          src={book.coverImageUrl}
                          alt={book.title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/150x200?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {book.authors.join(", ")}
                          </p>
                          <p className="text-lg font-semibold text-blue-600 mt-2">
                            {(book.price / 1000).toFixed(3)} VNĐ
                          </p>
                        </div>
                        <button
                          disabled={!user}
                          className={`mt-4 w-full px-4 py-2 rounded-lg transition
              ${
                user
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
                          onClick={() => console.log("…")}
                        >
                          {user ? "Thêm vào giỏ" : "Đăng nhập để mua"}
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Trang trước
                </button>
                <span className="py-2">
                  Trang {page} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Trang sau
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 Cửa Hàng Sách Online. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
