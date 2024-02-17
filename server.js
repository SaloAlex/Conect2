import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import axios from 'axios';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar el CORS a nivel global
app.use(cors({
  origin: "https://conect2.netlify.app", // Permitir el acceso desde tu dominio
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos permitidos
  credentials: true, // Permitir el envío de cookies
  optionsSuccessStatus: 204, // Código de estado para las solicitudes preflight
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


// Ruta para manejar la solicitud de búsqueda de jugadores de Riot Games por gameName y tagLine
app.get("/user-profile/riot/account/v1/accounts/by-riot-id", async (req, res) => {
  try {
    // Obtener parámetros de la URL
    const { gameName, tagLine } = req.query;

    // Reemplazar 'TU_CLAVE_DE_API' con tu propia clave de desarrollador de Riot Games
    const apiKey = "TU_CLAVE_DE_API";

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
app.get("/user-profile/lol/summoner/v4/summoners/by-name", async (req, res) => {
  try {
    const { summonerName } = req.query;
    const apiKey = "TU_CLAVE_DE_API";
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


// Modificar la ruta actual para aceptar solicitudes CORS
app.post('/send-email', async (req, res) => {
  try {
    const emailData = req.body;
    const apiKey = 're_hNxD7teW_EHNxzFAyiSv74CqQkX71EFwn';
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://master--conect2.netlify.app/', // Permitir solicitudes desde tu aplicación React
      },
      body: JSON.stringify(emailData),
    });

    const responseData = await response.json();
    res.json(responseData);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Iniciar el servidor en el puerto que quieras
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
