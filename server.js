import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import axios from "axios";
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración CORS
app.use(cors({
  origin: 'https://conect2.netlify.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));



// Rutas para manejar la solicitud de búsqueda de jugadores de Riot Games por gameName y tagLine
app.get("/api/riot/account/v1/accounts/by-riot-id", async (req, res) => {
  try {
    const { gameName, tagLine } = req.query;
    const apiKey = "RGAPI-81881bf4-9928-433b-a9a3-dc8e0eef3b62";
    const response = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching player data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta para manejar la solicitud de búsqueda de jugadores por summonerName
app.get("/api/lol/summoner/v4/summoners/by-name", async (req, res) => {
  try {
    const { summonerName } = req.query;
    const apiKey = "RGAPI-81881bf4-9928-433b-a9a3-dc8e0eef3b62";
    const response = await axios.get(
      `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}?api_key=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching summoner data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Ruta para manejar la solicitud de envío de correos electrónicos
app.post("/send-email", async (req, res) => {
  try {
    const emailData = req.body;

    const resend = new Resend('re_T7JQmD32_HPEpvv6hLf5AUM3BPJ1hdwUb');

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [emailData.to],
      subject: emailData.subject,
      html: emailData.text,
    });

    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Error sending email. Please try again." });
    }

    // Puedes ajustar el objeto de respuesta según lo que quieras incluir
    res.json({ message: "Email sent successfully", data });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Iniciar el servidor en el puerto que quieras
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
