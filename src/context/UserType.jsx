import React from "react";
import { Link, useNavigate } from "react-router-dom";
import StepProgressBar from "../components/StepProgressBar";
import Logo from "../assets/logo.png";
import AuthImage from "../assets/auth-image.jpg";
import { TbPacman } from "react-icons/tb";
import UserForm from "./UserForm"; // Asegúrate de importar correctamente el componente y ajustar la ruta si es necesario

function UserType() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = React.useState("graduated");

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
    // Navegar a la página "/user-form" al hacer clic en cualquiera de las opciones
    navigate("/user-form");
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
                  What is your profile? <TbPacman className="ml-2" />
                </h1>
              </div>
              {/* Form */}
              <form>
                {/* Options for user type */}
                <div className="mb-4">
                  <div className="flex flex-col space-y-4">
                    {/* Option: I have already graduated college */}
                    <div
                      className={`cursor-pointer border rounded-md p-4 ${
                        selectedOption === "graduated" ? "bg-blue-200" : ""
                      }`}
                      onClick={() => handleOptionSelection("graduated")}
                    >
                      <h2 className="text-lg font-bold mb-2">
                        I have already graduated college
                      </h2>
                      <p className="text-sm text-gray-600">
                        Select this option if you have already completed college.
                      </p>
                    </div>
                    {/* Option: I'm a current college student */}
                    <div
                      className={`cursor-pointer border rounded-md p-4 ${
                        selectedOption === "college" ? "bg-blue-200" : ""
                      }`}
                      onClick={() => handleOptionSelection("college")}
                    >
                      <h2 className="text-lg font-bold mb-2">
                        I'm a current college student
                      </h2>
                      <p className="text-sm text-gray-600">
                        Select this option if you are currently enrolled in college.
                      </p>
                    </div>
                    {/* Option: I am a high school / middle school student */}
                    <div
                      className={`cursor-pointer border rounded-md p-4 ${
                        selectedOption === "highschool" ? "bg-blue-200" : ""
                      }`}
                      onClick={() => handleOptionSelection("highschool")}
                    >
                      <h2 className="text-lg font-bold mb-2">
                        I am a high school / middle school student
                      </h2>
                      <p className="text-sm text-gray-600">
                        Select this option if you are currently in high school or middle school.
                      </p>
                    </div>
                  </div>
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

export default UserType;
