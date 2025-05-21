import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const { state } = useLocation();
  const user = state?.user;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => {
        console.error(err);
        setError("Không tìm thấy sách");
      });
  }, [id]);

  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!book) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-200"
      >
        ← Quay lại
      </button>

      {/* Container 2 cột */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Ảnh bên trái */}
        <div className="w-full lg:w-1/3 flex-shrink-0">
          <div className="w-full aspect-[3/4]">
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x400?text=No+Image";
              }}
            />
          </div>
        </div>

        {/* Thông tin bên phải */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {book.title}
          </h1>

          <div className="space-y-2 mb-6">
            <p className="text-gray-700">
              <span className="font-semibold">Tác giả:</span> {book.authors}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Nhà xuất bản:</span>{" "}
              {book.publisher}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Thể loại:</span>{" "}
              {book.category.join(", ")}
            </p>
            <p className="text-2xl font-semibold text-blue-600">
              {(book.price / 1000).toFixed(3)} VNĐ
            </p>
          </div>

          <div className="prose prose-lg mb-6">
            <h2 className="text-2xl font-semibold mb-2">Mô tả</h2>
            <p>{book.description}</p>
          </div>

          <button
            disabled={!user}
            className={`mt-auto w-full px-6 py-3 rounded-lg text-lg font-medium transition ${
              user
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {user ? "Thêm vào giỏ" : "Đăng nhập để mua"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
