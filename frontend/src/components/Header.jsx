import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const Header = () => {
  const { cartCount } = useCart();
  const { user, logout } = useUser();

  return (
    <header className="bg-blue-600 text-white py-3 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Cửa Hàng Sách
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/cart" className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <span className="text-sm">{user.fullName || user.email}</span>
              <button
                onClick={logout}
                className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 transition text-sm"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="bg-blue-700 text-white px-2 py-1 rounded hover:bg-blue-800 transition text-sm"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition text-sm"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;