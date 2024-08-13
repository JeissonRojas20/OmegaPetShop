//RUTAS
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//COMPONENTES
//Cabecera de la pagina
import Header from './components/Header';
//Pie de pagina
import Footer from './components/Footer';

//PAGINA DE INICIO
import Home from './pages/Home';

//CLIENTE
//Registro clientes
import CustomerRegister from './pages/customers/CustomerRegister';
//Validacion
import CustomerValidation from './pages/customers/CustomerValidation';

//PRODUCTOS
//Registro de productos
import AddProduct from './pages/products/AddProducts';
//Consulta productos
import ProductList from './pages/products/ProductList';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Cliente */}
            <Route path="/addCustomer" element={<CustomerRegister />} />
            <Route path="/customerValidation" element={<CustomerValidation />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/products" element={<ProductList />} />
            {/* <Route path="/cart" element={<ShoppingCart />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;