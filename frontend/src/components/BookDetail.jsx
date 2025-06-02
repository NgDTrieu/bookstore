// BookDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Header from "./Header";

const BookDetail = () => {
  const { addToCart } = useCart();
  const { state } = useLocation();
  const user = state?.user;
  const [localUser, setLocalUser] = useState(user);

  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  // Các state cho phần xem trước trang sách
  const [showPages, setShowPages] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);

  // Mock URLs cho 4 trang đầu
  const mockPages = [
    "../../mockupbook/page1.png",
    "../../mockupbook/page2.png",
    "../../mockupbook/page3.png",
    "../../mockupbook/page4.png",
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => {
        console.error(err);
        setError("Không tìm thấy sách");
      });
  }, [id]);

  // zoom bằng wheel
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((z) => Math.min(Math.max(z + delta, 0.5), 3));
  };

  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!book) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Header user={localUser} setUser={setLocalUser} />
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-200"
        >
          ← Quay lại
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="w-full object-contain"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x400?text=No+Image";
              }}
            />
          </div>

          <div className="w-full lg:w-2/3 flex flex-col">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {book.title}
            </h1>

            <div className="space-y-2 mb-6">
              <p className="text-gray-700">
                <span className="font-semibold">Tác giả:</span>{" "}
                {book.authors.map((author, idx) => (
                  <span key={author}>
                    <Link
                      to={`/?search=${encodeURIComponent(author)}&page=1`}
                      className="text-blue-600 hover:underline"
                    >
                      {author}
                    </Link>
                    {idx < book.authors.length - 1 && ", "}
                  </span>
                ))}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">Nhà xuất bản:</span>{" "}
                {book.publisher}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">Thể loại:</span>{" "}
                {book.category.map((cat, idx) => (
                  <span key={cat}>
                    <Link
                      to={`/?search=${encodeURIComponent(cat)}&page=1`}
                      className="text-blue-600 hover:underline"
                    >
                      {cat}
                    </Link>
                    {idx < book.category.length - 1 && ", "}
                  </span>
                ))}
              </p>

              <p className="text-2xl font-semibold text-blue-600">
                {(book.price / 1000).toFixed(3)} VNĐ
              </p>
            </div>

            <div className="prose prose-lg mb-6">
              <h2 className="text-2xl font-semibold mb-2">Mô tả</h2>
              <p>{book.description}</p>
            </div>

            {localUser && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Xem trước sách</h2>
                <button
                  onClick={() => setShowPages((v) => !v)}
                  className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
                >
                  {showPages ? "Ẩn trang" : "Xem 4 trang đầu"}
                </button>

                {showPages && (
                  <div className="grid grid-cols-4 gap-4">
                    {mockPages.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`Page ${idx + 1}`}
                        className="cursor-pointer border hover:shadow-lg"
                        onClick={() => {
                          setCurrentPage(idx);
                          setZoom(1);
                          setModalOpen(true);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {modalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 text-white text-2xl"
                >
                  ×
                </button>

                <div className="relative flex items-center space-x-4">
                  <button
                    onClick={() =>
                      setCurrentPage(
                        (cp) => (cp - 1 + mockPages.length) % mockPages.length
                      )
                    }
                    className="text-white text-4xl px-4"
                  >
                    ‹
                  </button>

                  <div onWheel={handleWheel} className="overflow-hidden">
                    <img
                      src={mockPages[currentPage]}
                      alt={`Trang ${currentPage + 1}`}
                      style={{ transform: `scale(${zoom})` }}
                      className="max-h-[80vh] max-w-[80vw] transition-transform"
                    />
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((cp) => (cp + 1) % mockPages.length)
                    }
                    className="text-white text-4xl px-4"
                  >
                    ›
                  </button>
                </div>
              </div>
            )}

            <button
              disabled={!localUser}
              className={`mt-4 w-full px-4 py-2 rounded-lg transition
                ${localUser ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
              onClick={() => addToCart(book)}
            >
              {localUser ? "Thêm vào giỏ" : "Đăng nhập để mua"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;