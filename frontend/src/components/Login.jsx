import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset lỗi

    // Kiểm tra email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Vui lòng nhập email hợp lệ');
      return;
    }

    // Kiểm tra mật khẩu
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Email hoặc mật khẩu không đúng');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Đăng nhập</h2>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Đăng nhập
        </button>
      </form>
      <p className="mt-4 text-center">
        Chưa có tài khoản?{' '}
        <a href="/register" className="text-blue-500 hover:underline">
          Đăng ký
        </a>
      </p>
    </div>
  );
};

export default Login;