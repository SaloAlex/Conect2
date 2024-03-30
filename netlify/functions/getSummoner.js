const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const { summonerName } = JSON.parse(event.body);
    
    // Tu clave de API de Riot Games
    const apiKey = 'RGAPI-ac16c292-d2bb-45bd-8bef-6248f45782eb';
    
    // Lógica para obtener información de un jugador por summonerName
    const response = await axios.get(`https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`, {
      headers: {
        'X-Riot-Token': apiKey
      }
    });
    
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
