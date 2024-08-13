import React from "react";

function Home() {

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido a Pet Store</h1>
                <p className="text-xl text-gray-600">
                    Esta es una página web donde puedes conseguir cualquier tipo de producto para tu mascota.
                </p>
                <p className="text-lg text-gray-500 mt-2">
                    Encuentra todo lo que necesitas para consentir a tu mejor amigo.
                </p>
            </div>
        </div>
    );
}

export default Home;