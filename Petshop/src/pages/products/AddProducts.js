import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from '../../services/api.json';

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    size: ''
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
    if (!product.price) errors.price = "El precio es necesario";
    if (!product.category.trim()) errors.category = "La categoria es requerida";
    if (!product.image.trim()) errors.image = "El enlace de la imagen es requerido";
    if (!product.description.trim()) errors.description = "La descripcion del producto es requerida";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8080/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...product,
            id: Date.now()
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
    <div className="max-w-md mx-auto mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-5">Registrar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Nombre</label>
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
          <label htmlFor="price" className="block mb-1">Precio</label>
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
          <label htmlFor="category" className="block mb-1">Categoria</label>
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
          <label htmlFor="image" className="block mb-1">Enlace de la imagen</label>
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
        <div>
          <label htmlFor="description" className="block mb-1">Descripcion del producto</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="size" className="block mb-1">Tamaño productos</label>
          <input type='text'
            id="size"
            name="size"
            value={product.size}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
            placeholder='Si existen tamaños en este producto, separelos por coma'
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