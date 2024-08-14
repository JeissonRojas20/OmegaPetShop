import React from 'react';

function HeaderCustomer({ onLogout, cartItems = 0 }) {  // Asumimos que el nombre de usuario, función de logout y número de items en el carrito se pasan como props

    return (
        <nav className="bg-white dark:bg-gray-800 antialiased">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-8">
                        <div className="shrink-0">
                            <a href="/" title="Home">
                                <img className="w-auto h-8 rounded-3xl" src="https://static.vecteezy.com/system/resources/previews/005/601/776/non_2x/pet-shop-logo-vector.jpg" alt="Pet Shop Logo" />
                            </a>
                        </div>
                    </div>

                    {/* Enlaces centrales */}
                    <div className="flex items-center justify-center space-x-6">
                        <a href="/products" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                            Productos
                        </a>
                    </div>

                    {/* Carrito de Compras y Usuario */}
                    <div className="flex items-center space-x-4">
                        {/* Carrito de Compras */}
                        <div className="relative">
                            <a href="/cart" className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                                🛒
                            </a>
                            {cartItems > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                    {cartItems}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center">
                            <button 
                                onClick={onLogout} 
                                className="ml-4 text-sm text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default HeaderCustomer;
