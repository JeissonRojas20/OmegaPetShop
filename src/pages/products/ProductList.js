import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Hacer la petición a la API para obtener los productos
    fetch('http://localhost:3000/products') 
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} añadido al carrito.`);
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center my-8">Nuestros Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">Categoría: {product.category}</p>
            <p className="text-gray-800 font-bold">Precio: ${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
