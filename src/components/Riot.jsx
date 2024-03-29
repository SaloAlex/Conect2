import React, { useState } from "react";
import axios from "axios";
import LogoLol from "../assets/lol.png"


const baseURL = "https://master--conect2.netlify.app/user-profile";


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
      const riotAccountEndpoint = `${baseURL}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
      const riotAccountResponse = await axios.get(riotAccountEndpoint);

      const summonerEndpoint = `${baseURL}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(gameName)}`;
      const summonerResponse = await axios.get(summonerEndpoint);

      const leagueEndpoint = `${baseURL}/lol/league/v4/entries/by-summoner/${summonerResponse.data.accountId}`;
      const leagueResponse = await axios.get(leagueEndpoint);

      setPlayerData({
        riotAccount: riotAccountResponse.data,
        summoner: summonerResponse.data,
        league: leagueResponse.data,
      });
    } catch (error) {
      console.error("Error searching player:", error);
      setError("Error searching player. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4 flex text-center">
        Riot Games
        <img
          src={LogoLol} 
          alt="Riot Logo"
          className="ml-2 h-10 w-10" 
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

          {/* Información de la liga */}
          <h3 className="text-lg font-semibold">League:</h3>
          <p>Queue Type: {playerData.league[0].queueType}</p>
          <p>
            Tier: {playerData.league[0].tier}
            {playerData.league[0].tier && (
              <img
                src={`https://opgg-static.akamaized.net/images/medals_new/${playerData.league[0].tier.toLowerCase()}.png?image=q_auto,f_webp,w_144&v=1708681571653`}
                alt={`${playerData.league[0].tier} Medal`}
                className="inline-block ml-2 h-8 w-8"
              />
            )}
          </p>
          <p>Rank: {playerData.league[0].rank}</p>
          <p>League Points: {playerData.league[0].leaguePoints}</p>
          <p>Wins: {playerData.league[0].wins}</p>
          <p>Losses: {playerData.league[0].losses}</p>
        </div>
      )}
    </div>
  );
};

export default Riot;
