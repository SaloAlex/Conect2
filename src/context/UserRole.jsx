import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StepProgressBar from "../components/StepProgressBar";
import Logo from "../assets/logo.png";
import AuthImage from "../assets/auth-image.jpg";
import { TbPacman } from "react-icons/tb";

function UserRole() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("player");
  const [mlModelActivated, setMlModelActivated] = useState(false);

  const handleModelActivation = () => {
    setMlModelActivated((prevActivated) => !prevActivated);
  };

  const handleCardClick = () => {
    // Navegar a la página "/user-type" al hacer clic en la tarjeta
    navigate("/user-type");
  };
  const handleProgramCardClick = () => {
    // Navegar a la página "/organization-type" al hacer clic en la tarjeta "Program"
    navigate("/organization-type");
  };

  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100vh] h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center">
                  <Link to="/Login" className="block">
                    <img className="h-20 w-auto mr-2" src={Logo} alt="Logo" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <div>
                <h1 className="flex items-center text-3xl font-extrabold text-gray-900 text-center mb-6">
                  What type of user are you? <TbPacman className="ml-2" />
                </h1>
              </div>
              {/* Form */}
              <form>
                {/* Tarjetas de selección de tipo de usuario */}
                <div className="mb-4">
                  <div className="flex space-x-4">
                    {/* Tarjeta Player */}
                    <div
                      className={`flex-1 cursor-pointer border rounded-md p-4 ${
                        selectedOption === "player" ? "bg-blue-200" : ""
                      }`}
                      onClick={() => {
                        setSelectedOption("player");
                        handleCardClick(); // Llama a la función de navegación al hacer clic en la tarjeta
                      }}
                    >
                      <h2 className="text-lg font-bold mb-2">Player</h2>
                      <p className="text-sm text-gray-600">
                        Become a player and join the community.
                      </p>
                    </div>
                    {/* O
      {/* Tarjeta Program */}
                    <div
                      className={`flex-1 cursor-pointer border rounded-md p-4 ${
                        selectedOption === "program" ? "bg-blue-200" : ""
                      }`}
                      onClick={() => {
                        setSelectedOption("program");
                        handleProgramCardClick(); // Llama a la función de navegación al hacer clic en la tarjeta "Program"
                      }}
                    >
                      <h2 className="text-lg font-bold mb-2">Program</h2>
                      <p className="text-sm text-gray-600">
                        Join as a program and manage players.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Título de la opción de activación del modelo de aprendizaje automático */}
                <h2 className="text-lg font-bold mb-2">
                  Activate our machine learning model beta
                </h2>
                {/* Descripción de la opción de activación del modelo de aprendizaje automático */}
                <p className="text-sm text-gray-600 mb-4">
                  Get reports sent to your inbox on autopilot as well as our
                  recommendations, insights, and potential matches.
                </p>
                {/* Switch para activar o desactivar la opción */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button" // Evita que el formulario se envíe al hacer clic en el botón
                    className={`relative rounded-full w-12 h-6 transition-colors duration-200 ${
                      mlModelActivated ? "bg-blue-700" : "bg-gray-300"
                    }`}
                    onClick={handleModelActivation} // Manejador de clic
                  >
                    <span
                      className={`absolute left-0 inset-y-0 w-6 h-6 rounded-full transition-transform duration-200 transform ${
                        mlModelActivated
                          ? "translate-x-full bg-white"
                          : "bg-gray-400"
                      }`}
                    />
                  </button>
                </div>

                <StepProgressBar />
              </form>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
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

export default UserRole;
