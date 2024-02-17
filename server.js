import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Leer las variables de entorno
const riotApiKey = process.env.RIOT_API_KEY;
const resendApiKey = process.env.RESEND_API_KEY;
// Constante para la URL base de la API de Riot Games
const riotApiUrl = 'https://americas.api.riotgames.com';

const app = express();
const PORT = process.env.PORT || 3001;


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu_correo@gmail.com',
    pass: 'tu_contraseña'
  }
});

// Configurar el CORS a nivel global
app.use(cors({
  origin: "https://conect2.netlify.app", // Permitir el acceso desde tu dominio
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos permitidos
  credentials: true, // Permitir el envío de cookies
  optionsSuccessStatus: 204, // Código de estado para las solicitudes preflight
}));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


// Ruta para manejar la solicitud de búsqueda de jugadores de Riot Games por gameName y tagLine
// Ruta para manejar la solicitud de búsqueda de jugadores de Riot Games por gameName y tagLine
app.get("/user-profile/riot/account/v1/accounts/by-riot-id", async (req, res) => {
  try {
    // Obtener parámetros de la URL
    const { gameName, tagLine } = req.query;

    // Hacer una solicitud real a la API de Riot Games con la clave de desarrollador
    const response = await axios.get(
      `${riotApiUrl}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
        gameName
      )}/${encodeURIComponent(tagLine)}?api_key=${riotApiKey}`
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

    const response = await axios.get(
      `${riotApiUrl}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(
        summonerName
      )}?api_key=${riotApiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching summoner data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/send-email', async (req, res) => {
  try {
    const emailData = req.body;
    const mailOptions = {
      from: 'tu_correo@gmail.com',
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text
    };

    const info = await transporter.sendMail(mailOptions);
    res.json(info);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Iniciar el servidor en el puerto que quieras
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
