import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/books?page=${page}&limit=10`, {
          timeout: 30000,
        });
        console.log('Response data:', response.data);
        setBooks(response.data.books || []);
        setTotalPages(Math.ceil(response.data.total / response.data.limit));
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Không thể tải danh sách sách');
      }
    };
    fetchBooks();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Cửa Hàng Sách Online</h1>
          <p className="mt-2 text-lg text-center">
            Khám phá thế giới tri thức với hàng ngàn cuốn sách hấp dẫn!
          </p>
        </div>
      </header>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Hãy tham gia ngay để mua sắm!
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Đăng ký
            </Link>
          </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <div
                    key={book._id} // Sửa từ book.id thành book._id
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150x200?text=No+Image';
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-800">{book.title}</h3>
                      <p className="text-sm text-gray-600">
                        {book.authors.join(', ')}
                      </p>
                      <p className="text-lg font-semibold text-blue-600 mt-2">
                        {(book.price / 1000).toFixed(3)} VNĐ
                      </p>
                      <button
                        disabled
                        className="mt-4 w-full bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
                      >
                        Đăng nhập để mua
                      </button>
                    </div>
                  </div>
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
                <span className="py-2">Trang {page} / {totalPages}</span>
                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
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