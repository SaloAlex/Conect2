import React from 'react';
import UserProfile from '../context/UserProfile'; // Asegúrate de tener la ruta correcta

const User = () => {
  const user = {
    name: 'Nombre del Usuario',
    email: 'usuario@dominio.com',
    // Agrega más propiedades según sea necesario
  };

  return (
    <div>
      {/* Asegúrate de pasar la prop 'user' al componente UserProfile */}
      <UserProfile user={user} />
    </div>
  );
};

export default User;
