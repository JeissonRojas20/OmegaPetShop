import React from 'react';
import { Link } from 'react-router-dom';

function CartPage({ cart, removeFromCart, updateQuantity }) {
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Tu Carrito de Compras</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">Tu carrito está vacío</p>
          <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300">
            Volver a la tienda
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {cart.map(item => (
              <div key={item.id} className="flex items-center border-b border-gray-200 py-4 px-6">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">${Number(item.price).toFixed(2)} cada uno</p>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-l"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-16 text-center border-t border-b border-gray-200 py-1"
                  />
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-r"
                  >
                    +
                  </button>
                </div>
                <p className="font-semibold text-lg text-gray-800 ml-4 w-24 text-right">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <Link to="/products" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300">
              Continuar comprando
            </Link>
            <div className="text-right">
              <p className="text-xl font-semibold text-gray-800">Total: ${total.toFixed(2)}</p>
              <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                Proceder al pago
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
