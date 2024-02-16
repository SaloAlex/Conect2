import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StepProgressBar from "../components/StepProgressBar";
import Logo from "../assets/logo.png";
import GirlImage from "../assets/girl-image.jpg";
import { firestore } from "../components/firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { TbPacman } from "react-icons/tb";
import { Resend } from 'resend';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';

function UserForm() {
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Nuevo estado para la contraseña
  const [selectedOption, setSelectedOption] = useState("graduated");
  const [mlModelActivated, setMlModelActivated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  // API de resend
  const resend = new Resend('re_hNxD7teW_EHNxzFAyiSv74CqQkX71EFwn'); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(
        collection(firestore, "DGqqSKQdfhNjREMquMk7"),
        {
          state,
          city,
          zipCode,
          country,
          email,
          password, 
          selectedOption,
          mlModelActivated,
        }
      );
      console.log("Document written with ID: ", docRef.id);

      // Enviar el correo de confirmación
      sendConfirmationEmail();

      // Redirigir a la siguiente página
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const sendConfirmationEmail = async () => {
    const emailData = {
      from: 'Conect2 <onboarding@resend.dev>',
      to: [email],
      subject: 'Confirmación de Registro',
      html: '<strong>¡Gracias por registrarte en Conecta2!</strong>',
    };
  
    try {
      const response = await axios.post('http://localhost:3001/send-email', emailData);
  
      // Manejar la respuesta del servidor
      if (response.status === 200) {
        // Mostrar una alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado correctamente!',
          text: 'Te enviamos un email ( revisa tu casilla de spam)',
          confirmButtonText: 'Ok',
        });
  
        // Puedes realizar otras acciones después de enviar el correo de confirmación si es necesario
      } else {
        // Mostrar una alerta de error en caso de fallo
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar el correo de confirmación',
          text: 'Hubo un problema al intentar enviar el correo de confirmación.',
          confirmButtonText: 'Ok',
        });
      }
    } catch (error) {
      // Mostrar una alerta de error en caso de fallo
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar el correo de confirmación',
        text: 'Hubo un problema al intentar enviar el correo de confirmación.',
        confirmButtonText: 'Ok',
      });
  
      console.error('Error sending confirmation email:', error);
    }
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
              <form onSubmit={handleSubmit}>
                {/* State of Residence */}
                <div className="mb-4">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State of Residence <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                {/* City */}
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                {/* Zip/Postal Code */}
                <div className="mb-4">
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zip/Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </div>
                {/* Country */}
                <div className="mb-4">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
                {/* Email */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* Password */}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 px-4 py-1 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash /> }
                    </button>
                  </div>
                </div>
                {/* Botón de enviar */}
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Enviar
                </button>
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
            src={GirlImage}
            alt="Authentication"
          />
        </div>
      </div>
    </main>
  );
}

export default UserForm;
