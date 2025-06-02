import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((book, idx) => (
            <li
              key={`${book.id}-${idx}`}
              className="flex justify-between items-center bg-white p-4 rounded shadow"
            >
              <Link
                to={`/books/${book.id}`}
                className="text-blue-600 hover:underline"
              >
                {book.title}
              </Link>
              <span className="font-semibold">{book.price.toLocaleString()} VND</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
