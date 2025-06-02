import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import Header from "./Header";

const Cart = ({ user, setUser }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Group identical books and count quantities
  const groupedItems = cartItems.reduce((acc, book) => {
    const existing = acc.find((item) => item.id === book.id);
    if (existing) {
      existing.quantity += 1;
      existing.totalPrice = existing.quantity * book.price;
    } else {
      acc.push({ ...book, quantity: 1, totalPrice: book.price });
    }
    return acc;
  }, []);

  // Calculate total price
  const totalPrice = groupedItems.reduce((total, book) => total + book.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Header user={user} setUser={setUser} />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-200"
        >
          ← Quay lại
        </button>
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Giỏ hàng của bạn</h1>
        {groupedItems.length === 0 ? (
          <p className="text-center text-gray-600">Giỏ hàng trống.</p>
        ) : (
          <div>
            <div className="space-y-4 mb-8">
              {groupedItems.map((book, idx) => (
                <div
                  key={`${book.id}-${idx}`}
                  className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <span className="w-12 text-center font-semibold text-gray-700">
                    {idx + 1}.
                  </span>
                  <div className="flex-grow">
                    <Link
                      to={`/books/${book.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {book.title}
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(book.id, book.quantity - 1)}
                        disabled={book.quantity <= 1}
                        className="p-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center">{book.quantity}</span>
                      <button
                        onClick={() => updateQuantity(book.id, book.quantity + 1)}
                        className="p-1 text-gray-600 hover:text-gray-800"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="w-32 text-right font-semibold text-blue-600">
                      {(book.totalPrice / 1000).toFixed(3)} VNĐ
                    </span>
                    <button
                      onClick={() => removeFromCart(book.id)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center border-t pt-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Tổng cộng:
              </h2>
              <span className="text-2xl font-bold text-blue-600">
                {(totalPrice / 1000).toFixed(3)} VNĐ
              </span>
            </div>
            <button
              className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Xác nhận mua hàng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;