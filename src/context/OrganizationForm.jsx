import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLightBulb } from "react-icons/hi";
import StepProgressBar from "../components/StepProgressBar";
import Logo from "../assets/logo.png";
import AuthImage from "../assets/auth-image.jpg";
import { firestore } from "../components/firebase/firebase.config";
import { collection, addDoc, setDoc } from "firebase/firestore";
import { TbPacman } from "react-icons/tb";


function OrganizationForm() {
  const navigate = useNavigate();
  const [organizationName, setOrganizationName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [organizationAddress, setOrganizationAddress] = useState("");
  const [country, setCountry] = useState("");
  const [selectedOption, setSelectedOption] = useState("graduated");
  const [mlModelActivated, setMlModelActivated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(firestore, "DGqqSKQdfhNjREMquMk7"), {
        organizationName,
        contactName,
        contactEmail,
        organizationAddress,
        country,
        selectedOption,
        mlModelActivated,
      });
      console.log("Document written with ID: ", docRef.id);
      // Redirect to the next page
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
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
                  Organization Information <TbPacman className="ml-2" />
                </h1>
              </div>
              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Organization Name */}
                <div className="mb-4">
                  <label
                    htmlFor="organizationName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                  />
                </div>
                {/* Contact Name */}
                <div className="mb-4">
                  <label
                    htmlFor="contactName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>
                {/* Contact Email */}
                <div className="mb-4">
                  <label
                    htmlFor="contactEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                </div>
                {/* Organization Address */}
                <div className="mb-4">
                  <label
                    htmlFor="organizationAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address of Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="organizationAddress"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={organizationAddress}
                    onChange={(e) => setOrganizationAddress(e.target.value)}
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
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit
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
            src={AuthImage}
            alt="Authentication"
          />
        </div>
      </div>
    </main>
  );
}

export default OrganizationForm;
