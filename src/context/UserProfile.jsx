import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaTwitter,
  FaInstagram,
  FaRocketchat,
} from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";
import Logo from "../assets/logo.png";
import Riot from "../components/Riot";
import UserAvatar from "../assets/avatar.jpg";
import UserBanner from "../assets/banner.png";

// ... (importaciones)

const UserProfile = () => {
  const [isFollowClicked, setIsFollowClicked] = useState(false);
  const [isChatClicked, setIsChatClicked] = useState(false);

  const handleFollowClick = () => {
    setIsFollowClicked(!isFollowClicked);
  };

  const handleChatClick = () => {
    setIsChatClicked(!isChatClicked);
  };
  
  return (
    <div className="bg-white max-w-screen-lg mx-auto p-4 grid grid-cols-2 grid-rows-3 gap-0">
      {/* Header */}
      <div className="header col-span-2 row-span-1">
        {/* Logo */}
        <div className="flex items-center mb-4">
          <Link to="" className="block">
            <img className="h-20 w-auto mr-2" src={Logo} alt="Logo" />
          </Link>
        </div>

        {/* Banner */}
        <img
          src={UserBanner}
          alt="User Banner"
          className="w-full h-40 object-cover mb-4 rounded-md"
        />

        {/* Avatar */}
        <img
          src={UserAvatar}
          alt="User Avatar"
          className="rounded-full mx-auto mb-4 w-32 h-32 -mt-16"
        />

        {/* Nombre y Encabezado */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Nicholas Braylan</h2>
          <p className="text-gray-500">
            fitness fanatic, Rocket League enthusiast, Keto diet lover.
          </p>

          {/* Descripción en formato de fila y botones redes */}
          <div className="flex items-center justify-center text-gray-700 mb-4">
            <FaMapMarkerAlt className="mr-2" /> Buenos Aires, AR
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-10 text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

       {/* Botones */}
       <div className="flex items-center justify-center">
        <button
          onClick={handleFollowClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 relative"
        >
          <SlUserFollow className={`mr-2 ${isFollowClicked ? 'hidden' : ''}`} />
          {isFollowClicked ? "No yet" : ""}
        </button>
        <button
          onClick={handleChatClick}
          className="bg-green-500 text-white px-4 py-2 rounded-md relative"
        >
          <FaRocketchat className={`mr-2 ${isChatClicked ? 'hidden' : ''}`} />
          {isChatClicked ? "No yet" : ""}
        </button>
        </div>
      </div>

      {/* Body */}
      <div className="body col-span-2 row-span-2">
        {/* Línea de separación */}
        <hr className="my-6 border-t border-gray-300 w-full" />

        {/* Sección "About Me" y Componente Riot */}
        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <h3 className="text-lg font-semibold mb-2">About Me</h3>
            <p className="text-gray-700">
              I'm a fitness enthusiast, Rocket League lover, and Keto diet
              follower. Welcome to my profile!
            </p>
          </div>

          {/* Componente Riot */}
          <div className="w-1/2 pl-2">
            <Riot />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer col-span-2 row-span-1">
        {/* Contenido del footer (si es necesario) */}
      </div>
    </div>
  );
};

export default UserProfile;
