import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from '../../services/api.json';

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!product.name.trim()) errors.name = "El nombre del producto es requerido";
    if (!product.price) errors.price = "Price is required";
    if (!product.category.trim()) errors.category = "Category is required";
    if (!product.image.trim()) errors.image = "Image URL is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8080/products', { // Cambia la URL al endpoint de tu API falsa
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...product,
            id: Date.now() // Asegura un ID único para cada producto
          })
        });

        if (response.ok) {
          const newProduct = await response.json();
          console.log("Se creo el producto correctamente", newProduct);
          navigate('/products');
          alert("Producto añadido con exito");
        } else {
          console.error("Error al crear el producto");
        }
      } catch (error) {
        console.error("Error mientras se creaba el producto:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-1">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
        >
          {isLoading ? 'Añadiendo...' : 'Crear producto'}
        </button>
      </form>
    </div>
  );

}

export default AddProduct;