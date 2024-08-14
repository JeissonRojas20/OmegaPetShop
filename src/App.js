import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//COMPONENTES
import Header from './components/Header'
import HeaderAdmin from './components/headers/HeaderAdmin';
import HeaderCompany from './components/headers/HeaderCompany';
import HeaderCustomer from './components/headers/HeaderCustomer';
import Footer from './components/Footer';
//PAGINAS
import Home from './pages/Home';
import CustomerRegister from './pages/customers/CustomerRegister';
import RegisterFormCompany from './pages/company/CompanyRegister';
import Validation from './pages/Validation';
import AddProduct from './pages/products/AddProducts';
import ProductList from './pages/products/ProductList';
import CartPage from './pages/CartPage';

function App() {
  // Estado para manejar el usuario
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Obtener la información del usuario desde localStorage al cargar el componente
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    // Obtener el carrito guardado
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    // Guardar el carrito en localStorage cada vez que cambie
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const onLogout = () => {
    // Eliminar la información del usuario y token de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Actualizar el estado del usuario a null
    setUser(null);
    window.location.href = '/';
  };

  const renderHeader = () => {
    if (user?.rol === 'admin') {
      return <HeaderAdmin onLogout={onLogout} />;
    } else if (user?.rol === 'company') {
      return <HeaderCompany onLogout={onLogout} />;
    } else if (user?.rol === 'customer') {
      return <HeaderCustomer onLogout={onLogout} />;
    } else {
      return <Header />; // Si no hay usuario o rol, no se muestra ningún Header
    }
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        );
      }
      return [...prevCart, {...product, quantity: 1}];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => prevCart.map(item => 
      item.id === productId ? {...item, quantity: newQuantity} : item
    ));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {renderHeader()}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Cliente */}
            <Route path="/addCustomer" element={<CustomerRegister />} />
            <Route path="/addCompany" element={<RegisterFormCompany />} />
            <Route path="/customerValidation" element={<Validation />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/products" element={<ProductList addToCart={addToCart} cart={cart} />} />
            <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;