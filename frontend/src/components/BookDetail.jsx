import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => {
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
      <p className="text-gray-700 mb-2">Thể loại: {book.category}</p>
      <p className="text-lg font-semibold text-blue-600 mb-4">
        {(book.price / 1000).toFixed(3)} VNĐ
      </p>
      <div className="prose mb-6">
        <h2>Mô tả</h2>
        <p>{book.description}</p>
      </div>
      {/* Nút thêm vào giỏ tương tự Home.jsx nếu cần */}
    </div>
  );
};

export default BookDetail;
