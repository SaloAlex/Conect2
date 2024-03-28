import React from "react";
import LogoLol from "../assets/lol.png"

const ComponentSelector = ({ onSelectComponent }) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={() => onSelectComponent("riot")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        Riot
        <img
          src={LogoLol} // Reemplaza con la ruta correcta de tu imagen
          alt="Riot Logo"
          className="ml-2 h-6 w-6" // Puedes ajustar las clases según tus necesidades
        />
      </button>
      <button
        onClick={() => onSelectComponent("steam")}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Steam
      </button>
      <button
        onClick={() => onSelectComponent("battlefy")}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        Battlefy
      </button>
      
      <button
        onClick={() => onSelectComponent("battlefy")}
        className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
      >
        Epic games
      </button>
    </div>
  );
};

export default ComponentSelector;
