import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*", // Permitir el acceso desde cualquier origen
  })
);

app.use(express.static(path.join(__dirname, "build")));

 const apiKey = "RGAPI-ac16c292-d2bb-45bd-8bef-6248f45782eb";

// Ruta para manejar la solicitud de búsqueda de jugadores de Riot Games por gameName y tagLine
app.get("/riot/account/v1/accounts/by-riot-id", async (req, res) => {
  try {
    // Obtener parámetros de la URL
    const { gameName, tagLine } = req.query;

    // Hacer una solicitud real a la API de Riot Games con la clave de desarrollador
    const response = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
        gameName
      )}/${encodeURIComponent(tagLine)}?api_key=${apiKey}`
    );

    // Devolver la respuesta de la API de Riot Games
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching player data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta para manejar la solicitud de búsqueda de jugadores por summonerName
app.get("/lol/summoner/v4/summoners/by-name", async (req, res) => {
  try {
    const { summonerName } = req.query;
    const response = await axios.get(
      `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(
        summonerName
      )}?api_key=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching summoner data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta para manejar la solicitud de búsqueda de datos de la liga por summonerId
app.get("/lol/league/v4/entries/by-summoner/:encryptedSummonerId", async (req, res) => {
  try {
    // Obtener el parámetro de la URL
    const { encryptedSummonerId } = req.params;

    // Hacer una solicitud real a la API de Riot Games con la clave de desarrollador
    const response = await axios.get(
      `https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/${encodeURIComponent(
        encryptedSummonerId
      )}?api_key=${apiKey}`
    );

    console.log("League API Response:", response.data);

    // Devolver la respuesta de la API de Riot Games
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching league data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta para manejar la solicitud de envío de correo electrónico
app.post("/send-email", async (req, res) => {
  try {
    // Lógica para enviar correo electrónico
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
