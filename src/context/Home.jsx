import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import AuthImage from "../assets/auth-image.jpg";

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/user-role");
  };

  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Container del formulario */}
        <div className="md:w-1/2">
          <div className="min-h-[100vh] h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center">
                  <Link to="" className="block">
                    <img className="h-20 w-auto mr-2" src={Logo} alt="Logo" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">
                ¡Bienvenido a CONECTA2!
              </h1>
              {/* Botones */}
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={handleLogin}
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white rounded-md py-2 px-4 w-full"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={handleSignUp}
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white rounded-md py-2 px-4 w-full"
                >
                  Crear Usuario
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
        aria-hidden="true"
        >
          
          <img
            className="object-cover object-center w-full h-full"
            src={AuthImage}
            alt="Authentication"
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
