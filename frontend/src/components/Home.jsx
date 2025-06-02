import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  // Read `search` and `page` from URL query string
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    window.scrollTo({ top: 300, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/books", {
          params: { page, limit: 20, search },
          timeout: 30000,
        });
        setBooks(data.books || []);
        setTotalPages(Math.ceil(data.total / data.limit));
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Không thể tải danh sách sách");
      }
    };
    fetchBooks();
  }, [search, page]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios
        .get("http://localhost:3000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.clear();
          navigate("/login");
        });
    }
  }, [navigate]);

  // Handlers
  const handleSearchInput = (e) => {
    setSearchParams({ search: e.target.value, page: "1" });
  };

  const handleSearchSubmit = () => {
    setSearchParams({ search: search.trim(), page: "1" });
  };

  const goToPage = (newPage) => {
    setSearchParams({ search, page: newPage.toString() });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} setUser={setUser} />
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Hãy tham gia ngay để mua sắm!
          </h2>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="py-6 bg-white">
            <div className="max-w-3xl mx-auto px-4 flex">
              <input
                type="text"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
                placeholder="Tìm kiếm theo tên sách, tác giả hoặc nội dung..."
                value={search}
                onChange={handleSearchInput}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              />
              <button
                onClick={handleSearchSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
              >
                Tìm
              </button>
            </div>
          </section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Danh sách các cuốn sách
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
                  <Link to={`/books/${book.id}`} key={book.id} state={{ user }}>
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
                          <p className="text-sm text-gray-600">{book.authors}</p>
                          <p className="text-lg font-semibold text-blue-600 mt-2">
                            {(book.price / 1000).toFixed(3)} VNĐ
                          </p>
                        </div>
                        <button
                          disabled={!user}
                          className={`mt-4 w-full px-4 py-2 rounded-lg transition
                ${user ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
                          onClick={() => console.log("…")}
                        >
                          {user ? "Xem Chi tiết" : "Đăng nhập để mua"}
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <footer className="py-6 bg-white">
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => goToPage(Math.max(page - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Trang trước
                  </button>
                  <span>
                    Trang {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => goToPage(Math.min(page + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Trang sau
                  </button>
                </div>
              </footer>
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