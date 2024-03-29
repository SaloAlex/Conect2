// getLeague.js

const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const { encryptedSummonerId } = event.queryStringParameters;
    
    // Lógica para obtener información de la liga por encryptedSummonerId
    const response = await axios.get(`https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/${encodeURIComponent(encryptedSummonerId)}`);
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error getting league:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
