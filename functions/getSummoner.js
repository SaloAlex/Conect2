// getSummoner.js

const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const { summonerName } = JSON.parse(event.body);
    
    // Lógica para obtener información de un jugador por summonerName
    const response = await axios.get(`https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`);
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error getting summoner:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
