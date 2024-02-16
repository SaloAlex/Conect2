// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/logo.jpg';


const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={LogoImage} alt="Logo" className="h-20 rounded-md" />
        </Link>
        <div className="flex space-x-4">
          <Link to="/login" className="hover:text-gray-300">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="hover:text-gray-300">
            Crear Usuario
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
