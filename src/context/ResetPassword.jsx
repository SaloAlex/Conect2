import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Link } from "react-router-dom";
import AuthImage from "../assets/auth-image.jpg";
import Logo from "../assets/logo.png";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [error, setError] = useState(null);

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      const user = firebase.auth().currentUser;
      await user.updatePassword(newPassword);
      setPasswordChanged(true);
      setError(null);
    } catch (error) {
      setPasswordChanged(false);
      setError(error.message);
    }
  };

  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Formulario */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
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
              <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
                Change Password
              </h1>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium mb-1"
                  >
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="New password"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Confirm new password"
                  />
                </div>
                <div>
                  <button
                    onClick={handleChangePassword}
                    type="button"
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 rounded-lg py-2 px-4"
                  >
                    Change Password
                  </button>
                </div>
              </form>
              {passwordChanged && (
                <p className="text-green-500 text-center">
                  Password changed successfully.
                </p>
              )}
              {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
          </div>
        </div>

        {/* Imagen */}
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
};

export default ChangePassword;
