import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import BookDetail from './components/BookDetail';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import { OrderProvider } from './context/OrderContext';

function App() {
  return (
    <OrderProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
    </OrderProvider>
  );
}

export default App;