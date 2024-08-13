import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    discount: false,
  });

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = products;
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    if (filters.minPrice !== null && filters.maxPrice !== null) {
      filtered = filtered.filter(product => product.price >= filters.minPrice && product.price <= filters.maxPrice);
    }
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center my-12 text-cyan-600">Nuestros Productos</h2>
      <div className="flex">
        {/* Filtro */}
        <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Filtrar Productos</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Categoría</label>
            <select 
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Todas</option>
              <option value="Juguete">Juguete</option>
              <option value="Perros">Perros</option>
              <option value="Accesorios">Accesorios</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Rango de Precios</label>
            <div className="flex items-center">
              <input 
                type="number" 
                name="minPrice" 
                value={filters.minPrice} 
                onChange={handleFilterChange} 
                className="w-1/2 p-2 border rounded mr-2"
                placeholder="Min"
              />
              <input 
                type="number" 
                name="maxPrice" 
                value={filters.maxPrice} 
                onChange={handleFilterChange} 
                className="w-1/2 p-2 border rounded"
                placeholder="Max"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input 
                type="checkbox" 
                name="discount"
                checked={filters.discount} 
                onChange={handleFilterChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Solo con Descuento</span>
            </label>
          </div>
        </div>

        {/* Lista de Productos */}
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover mb-4 rounded-lg" 
              />
              <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-2">Categoría: {product.category}</p>
              <div className="text-gray-800 font-bold text-lg">
                <span className="line-through text-m text-gray-400">${product.price}</span> 
              </div>
              <p className="text-green-600 text-sm font-semibold">Empresa: ${product.cashback}</p>
              <button
                //onClick={() => addToCart(product)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
