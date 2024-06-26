import React, { useState } from "react";
import axios from "axios";
import LogoLol from "../assets/lol.png";

const Riot = () => {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleLoginWithRiot = () => {
    window.location.href = "https://auth.riotgames.com/authorize?client_id=670315&redirect_uri=http://localhost:5173/user-profile&response_type=code&scope=openid+offline_access";
  };

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
      // Endpoint 1: Buscar por gameName y tagLine
      const riotAccountEndpoint =
        "http://localhost:3001/riot/account/v1/accounts/by-riot-id";
      const riotAccountResponse = await axios.get(riotAccountEndpoint, {
        params: { gameName, tagLine },
      });

      // Endpoint 2: Buscar por summonerName (usando el mismo gameName)
      const summonerEndpoint =
        "http://localhost:3001/lol/summoner/v4/summoners/by-name";
      const summonerResponse = await axios.get(summonerEndpoint, {
        params: { summonerName: gameName },
      });

      // Endpoint 3: Buscar por encryptedSummonerId (usando el summonerId del segundo endpoint)
      const leagueEndpoint = `http://localhost:3001/lol/league/v4/entries/by-summoner/${summonerResponse.data.id}`;
      const leagueResponse = await axios.get(leagueEndpoint);

      // Actualizar el estado con los datos de los tres endpoints
      setPlayerData({
        riotAccount: riotAccountResponse.data,
        summoner: summonerResponse.data,
        league: leagueResponse.data,
      });
    } catch (error) {
      console.error(
        "Error searching player:",
        error.response ? error.response.data : error.message
      );
      setError("Error searching player. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4 flex text-center">
        Connect{" "}
        <img
          src={LogoLol} // Reemplaza con la ruta correcta de tu imagen
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
      {/* Botón para iniciar sesión con la cuenta de Riot */}
      <div className="text-center">
        <a href="https://auth.riotgames.com/authorize?client_id=670315&redirect_uri=http://localhost:5173/user-profile&response_type=code&scope=openid+offline_access"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log in with Riot Account
        </a>
      </div>

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
          <p>LP: {playerData.league[0].leaguePoints}</p>
          <p>Wins: {playerData.league[0].wins}</p>
          <p>Losses: {playerData.league[0].losses}</p>

              {/* Renderizar la lista de IDs de partidas */}
    <div>
      <h3 className="text-lg font-semibold">Match IDs:</h3>
      <ul>
        {playerData.matchIds.map((matchId, index) => (
          <li key={index}>{matchId}</li>
        ))}
      </ul>
    </div>
        </div>
      )}
    </div>
  );
};

export default Riot;
