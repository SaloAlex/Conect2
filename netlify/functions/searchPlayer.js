const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const { gameName, tagLine } = JSON.parse(event.body);
    
    // Tu clave de API de Riot Games
    const apiKey = 'RGAPI-ac16c292-d2bb-45bd-8bef-6248f45782eb';
    
    // Lógica para buscar jugadores de Riot Games por gameName y tagLine
    const response = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`, {
      headers: {
        'X-Riot-Token': apiKey
      }
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error searching players:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
