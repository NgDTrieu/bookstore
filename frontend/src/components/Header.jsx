import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/");
  };

  return (
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
              <Link to="/cart" className="relative">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center
                    px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
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
  );
};

export default Header;