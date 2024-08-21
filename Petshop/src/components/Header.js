import React from 'react';

function Header() {

    return (

        <nav className="bg-white dark:bg-mi-color-personalizado antialiased">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <div className="shrink-0">
                            <a href="/" title>
                                <img className="hidden w-auto h-20 dark:block rounded-full" src="https://static.vecteezy.com/system/resources/previews/005/601/776/non_2x/pet-shop-logo-vector.jpg" alt="Pet Shop Logo" />
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center justify-end lg:space-x-2 w-full">
                        <a href='/addCustomer' id="userDropdownButton1" data-dropdown-toggle="userDropdown1" type="button" className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-100 text-sm font-medium leading-none text-gray-900 dark:text-gray-700">
                            <svg className="w-7 h-7 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth={2} d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            Registrarme
                        </a>
                        <a href='/customerValidation' id="userDropdownButton2" data-dropdown-toggle="userDropdown2" type="button" className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-100 text-sm font-medium leading-none text-gray-900 dark:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7 me-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                            </svg>
                            Iniciar sesión
                        </a>
                    </div>

                </div>
            </div>
        </nav>


    );
}

export default Header;