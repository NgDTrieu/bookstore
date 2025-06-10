import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useOrders } from '../context/OrderContext';
import Header from './Header';

const OrderHistory = () => {
  const { user } = useUser();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [success, setSuccess] = useState(state?.success || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(false);
  }, [user, navigate]);

  if (loading) return <p className="text-center">Đang tải...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-200"
        >
          ← Quay lại Trang chủ
        </button>
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Lịch sử đơn hàng</h1>
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {success}
          </div>
        )}
        {orders.length === 0 ? (
          <p className="text-center text-gray-600">Bạn chưa có đơn hàng nào.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Mã đơn hàng: {order.id}</span>
                  <span className="font-semibold text-blue-600">
                    {(order.totalPrice / 1000).toFixed(3)} VNĐ
                  </span>
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">Ngày đặt:</span>{' '}
                  {new Date(order.createdAt).toLocaleString('vi-VN')}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Trạng thái:</span>{' '}
                  <span
                    className={`${
                      order.status === 'pending' ? 'text-yellow-600' :
                      order.status === 'completed' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {order.status === 'pending' ? 'Đang xử lý' :
                     order.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                  </span>
                </p>
                <div className="mt-2">
                  <p className="font-semibold">Sản phẩm:</p>
                  <ul className="list-disc pl-5">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="text-gray-700">
                        {item.title} - Số lượng: {item.quantity} - Giá: {(item.price / 1000).toFixed(3)} VNĐ
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;