import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de middleware
app.use(
  cors({
    origin: "https://conect2.netlify.app",
  })
);

// Middleware para manejar solo solicitudes de API
app.use("/api", (req, res, next) => {
  // Configuración de cors para permitir acceso desde cualquier origen
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Ruta para manejar la solicitud de búsqueda de jugadores de Riot Games por gameName y tagLine
app.get("/api/riot/account/v1/accounts/by-riot-id", async (req, res) => {
  try {
    // Obtener parámetros de la URL
    const { gameName, tagLine } = req.query;
    const apiKey = "RGAPI-81881bf4-9928-433b-a9a3-dc8e0eef3b62";

    const response = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
        gameName
      )}/${encodeURIComponent(tagLine)}?api_key=${apiKey}`
    );

    if (response.headers["content-type"] === "application/json") {
      // Si el tipo de contenido es JSON, procesar como tal
      console.log("Riot Account Response:", response.data);
      res.json(response.data);
    } else {
      // Si el tipo de contenido no es JSON, manejar el error
      console.error("Error: API returned HTML instead of JSON");
      res.status(500).json({ error: "Internal Server Error" });
    }
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

// Rutas para manejar solicitudes de React
app.use(express.static(path.join(__dirname, "public")));

// Manejar todas las demás solicitudes de React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/send-email", async (req, res) => {
  try {
    const emailData = req.body;
    const mailOptions = {
      from: "tu_correo@gmail.com",
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
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
