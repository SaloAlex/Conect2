import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthImage from "../assets/auth-image.jpg";
import googleLogo from "../assets/google.png";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import firebase from "firebase/compat/app";

function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  provider.addScope("user-role");
  provider.addScope("email");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Inicio de sesión exitoso, redirigir a la página de perfil
      navigate("/user-role");
    } catch (error) {
      // Manejar errores de inicio de sesión
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        // Mostrar SweetAlert de usuario no encontrado o contraseña incorrecta
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Usuario no encontrado o contraseña incorrecta.",
        });
      } else {
        // Mostrar SweetAlert de otros errores de inicio de sesión
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Usuario no registrado o contraseña incorrecta.",
        });
      }
    }
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault(); // Remueve el argumento 'e' de aquí

    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // El usuario ha iniciado sesión con éxito con Google, redirigir a la página de perfil
      navigate("/user-profile");
      // El usuario ha iniciado sesión con éxito, puedes redireccionar a la página de bienvenida o hacer otras operaciones.
    } catch (error) {
      // Manejar errores de inicio de sesión.
      console.error("Error al iniciar sesión con Google:", error.message);

      // Mostrar la alerta de error.
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al iniciar sesión con Google: ${error.message}`,
      });
    }
  };

  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center">
                  <Link to="/" className="block">
                    <img className="h-20 w-auto mr-2" src={Logo} alt="Logo" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 font-bold mb-6">
                Welcome back! ✨
              </h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input w-full border border-gray-300 rounded-md px-3 py-2"
                      type="email"
                      id="email"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input w-full border border-gray-300 rounded-md px-3 py-2"
                      type="password"
                      autoComplete="on"
                      id="password"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <a
                      className="text-sm underline hover:no-underline text-black"
                      href="/reset-password"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <button
                    onClick={(e) => handleLogin(e)}
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 rounded-sm  px-4"
                  >
                    Sign In
                  </button>
                  {/* Botón de inicio de sesión con Google */}
                  <button
                    onClick={signInWithGoogle}
                    className="btn bg-blue-300 hover:bg-blue-400 text-white ml-3 rounded-sm  px-3 flex items-center"
                  >
                    <div className="w-10 h-10 overflow-hidden mr-2 bg-white flex items-center rounded-sm justify-center">
                      <img
                        className="w-6 h-6 object-cover"
                        src={googleLogo}
                        alt="Google Logo"
                      />
                    </div>
                    Sign In with Google
                  </button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm text-black">
                  Don’t you have an account?{" "}
                  <a
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 rounded-lg py-2 px-3"
                    href="/user-role"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
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
            width="750"
            height="920"
            alt="Authentication"
          />
        </div>
      </div>
    </main>
  );
}

export default Login;
