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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">
        ← Quay lại
      </button>
      <img
        src={book.coverImageUrl}
        alt={book.title}
        className="w-full h-80 object-cover mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-700 mb-4">Tác giả: {book.authors.join(", ")}</p>
      <p className="text-gray-700 mb-2">Nhà xuất bản: {book.publisher}</p>
      <p className="text-gray-700 mb-2">Thể loại: {book.category.join(" ")}</p>
      <p className="text-lg font-semibold text-blue-600 mb-4">
        {(book.price / 1000).toFixed(3)} VNĐ
      </p>
      <div className="prose mb-6">
        <h2>Mô tả</h2>
        <p>{book.description}</p>
      </div>
      <button
        disabled={!user}
        className={`mt-4 w-full px-4 py-2 rounded-lg transition
        ${
          user
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        {user ? "Thêm vào giỏ" : "Đăng nhập để mua"}
      </button>
    </div>
  );
};

export default BookDetail;
