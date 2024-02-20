import React, { useState } from "react";
import axios from "axios";
import LogoLol from "../assets/lol.png";

const Riot = () => {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGameNameChange = (event) => {
    setGameName(event.target.value);
  };

  const handleTagLineChange = (event) => {
    setTagLine(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const riotAccountEndpoint =
        "https://conect2.netlify.app/riot/account/v1/accounts/by-riot-id";
      const riotAccountResponse = await axios.get(riotAccountEndpoint, {
        params: { gameName, tagLine },
      });
      console.log("Riot Account Response:", riotAccountResponse.data);

      const summonerEndpoint =
        "https://conect2.netlify.app/lol/summoner/v4/summoners/by-name";
      const summonerResponse = await axios.get(summonerEndpoint, {
        params: { summonerName: gameName },
      });
      console.log("Summoner Response:", summonerResponse.data);

      setPlayerData({
        riotAccount: riotAccountResponse.data,
        summoner: summonerResponse.data,
      });
    } catch (error) {
      console.error("Error searching player:", error);
      setError(`Error searching player. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4 flex text-center">
        Connect 
        <img
          src={LogoLol}// Reemplaza con la ruta correcta de tu imagen
          alt="Riot Logo"
          className="ml-2 h-10 w-10" // Puedes ajustar las clases según tus necesidades
        />
      </h2>

      <div className="mb-4">
        <label htmlFor="gameName" className="block text-gray-700">
          Enter Game Name:
        </label>
        <input
          type="text"
          id="gameName"
          value={gameName}
          onChange={handleGameNameChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tagLine" className="block text-gray-700">
          Enter Tag Line:
        </label>
        <input
          type="text"
          id="tagLine"
          value={tagLine}
          onChange={handleTagLineChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        {loading ? "Searching..." : "Connect" }
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {playerData && (
        <div className="mt-4">
          {/* Utilizamos el profileIconId directamente desde la respuesta del segundo endpoint */}
          {playerData.summoner.profileIconId && (
            <img
              src={`https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon${playerData.summoner.profileIconId}.jpg?image=q_auto,f_webp,w_auto&v=1707283412529`}
              alt="profile image"
              className="max-w-24 h-auto rounded-full"
            />
          )}

          <h3 className="text-lg font-semibold">Summoner:</h3>
          <p>Name: {playerData.summoner.name}</p>
          <p>Summoner Level: {playerData.summoner.summonerLevel}</p>
        </div>
      )}
    </div>
  );
};

export default Riot;
