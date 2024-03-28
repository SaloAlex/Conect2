import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaTwitter,
  FaInstagram,
  FaUserGraduate,
} from "react-icons/fa";
import Riot from "../components/Riot";
import ComponentSelector from "../components/ComponentSelector";
import UserDataForm from "../components/UserDataForm"; // Importamos el nuevo componente
import UserAvatar from "../assets/avatar.jpg";
import UserBanner from "../assets/banner.png";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [banner, setBanner] = useState(
    localStorage.getItem("banner") || UserBanner
  );
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || UserAvatar
  );
  const [name, setName] = useState(
    localStorage.getItem("name") || "Nicholas Braylan"
  );
  const [header, setHeader] = useState(
    localStorage.getItem("header") ||
      "fitness fanatic, Rocket Leagues enthusiast, Keto diet lovers."
  );
  const [editedBanner, setEditedBanner] = useState(banner);
  const [editedAvatar, setEditedAvatar] = useState(avatar);
  const [editedName, setEditedName] = useState(name);
  const [editedHeader, setEditedHeader] = useState(header);
  const [userState, setUserState] = useState(
    localStorage.getItem("userState") || ""
  );
  const [studyYear, setStudyYear] = useState(
    localStorage.getItem("studyYear") || ""
  );
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  useEffect(() => {
    localStorage.setItem("banner", editedBanner);
    localStorage.setItem("avatar", editedAvatar);
    localStorage.setItem("name", editedName);
    localStorage.setItem("header", editedHeader);
    localStorage.setItem("userState", userState);
    localStorage.setItem("studyYear", studyYear);
  }, [
    editedBanner,
    editedAvatar,
    editedName,
    editedHeader,
    userState,
    studyYear,
  ]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleStateChange = (event) => {
    setUserState(event.target.value);
  };

  const handleStudyYearChange = (event) => {
    setStudyYear(event.target.value);
  };

  const handleSaveProfile = () => {
    setBanner(editedBanner);
    setAvatar(editedAvatar);
    setName(editedName);
    setHeader(editedHeader);
    setIsEditing(false);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageDataUrl = reader.result;
      switch (type) {
        case "banner":
          setEditedBanner(imageDataUrl);
          break;
        case "avatar":
          setEditedAvatar(imageDataUrl);
          break;
        default:
          break;
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="grid grid-rows-3">
      <div className="row-span-1 bg-white max-w-screen-lg mx-auto p-4">
        <div className="header mb-4">
          <div className="flex items-center mb-4">
            <img
              src={banner}
              alt="User Banner"
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
          </div>
          <div className="flex items-center mb-4">
            <div className="mx-auto">
              <img
                src={avatar}
                alt="User Avatar"
                className="rounded-full w-32 h-32 -mt-12 mx-auto mb-1"
              />
            </div>
          </div>
          <div className="text-center mb-4">
            <input
              type="text"
              value={name}
              readOnly
              className="inline-block text-xl font-semibold mb-1"
            />
            <br />
            <div className="max-w-md mx-auto mb-2">
              <textarea
                value={header}
                readOnly
                className="text-gray-500 resize-none border-none bg-white overflow-hidden w-full block mx-auto"
                rows=""
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">State and Study Year</h3>
            <div className="flex items-center justify-center text-gray-700">
              <FaMapMarkerAlt className="mr-1" /> {userState} -{" "}
              <FaUserGraduate className="mr-1" /> {studyYear}
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-6 text-xl"
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
          <div className="flex items-center justify-center mt-2">
            <button
              onClick={handleEditProfile}
              className="bg-blue-800 text-white px-4 py-2 rounded-md ml-2"
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className="body grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <hr className="my-6 border-t border-gray-300 w-full" />
            {isEditing && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-md">
                  <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                  <label>Banner:</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "banner")}
                    className="w-full mb-4"
                  />
                  <img
                    src={editedBanner}
                    alt="Banner Preview"
                    className="w-full h-20 object-cover mb-4 rounded-md"
                  />
                  <label>Avatar:</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "avatar")}
                    className="w-full mb-4"
                  />
                  <img
                    src={editedAvatar}
                    alt="Avatar Preview"
                    className="w-full h-20 object-cover mb-4 rounded-full"
                  />
                  <label>Name:</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full mb-4"
                  />
                  <label>Header:</label>
                  <textarea
                    value={editedHeader}
                    onChange={(e) => setEditedHeader(e.target.value)}
                    className="w-full mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    State and Study Year
                  </h3>
                  <p className="text-gray-700">
                    <select value={userState} onChange={handleStateChange}>
                      <option value="">Select a state</option>
                      <option value="Alabama">Alabama</option>
                      <option value="Alaska">Alaska</option>
                      <option value="Arizona">Arizona</option>
                    </select>
                    <br />
                    <select value={studyYear} onChange={handleStudyYearChange}>
                      <option value="">Select study year</option>
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                    </select>
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Cuerpo */}
      <div className="row-span-1 bg-white max-w-screen-lg mx-auto pt-2 px-4 pb-4">
        <div className="body grid grid-cols-2 gap-4">
          <div className="col-span-1">
            {/* Aquí incluimos el nuevo componente UserDataForm */}
            <UserDataForm />
          </div>
          <div className="col-span-1">
            {/* Mostrar el componente seleccionado */}
            <ComponentSelector onSelectComponent={handleComponentSelect} />
            {selectedComponent === "riot" && <Riot />}
          </div>
        </div>
      </div>
      {/* Pie de Página */}
      <div className="row-span-1 bg-white max-w-screen-lg mx-auto p-4">
        {/* Contenido del pie de página */}
      </div>
    </div>
  );
            }
export default UserProfile;
