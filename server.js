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
app.use(
  cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));



// Rutas para manejar la solicitud de búsqueda de jugadores de Riot Games por gameName y tagLine
app.get("/api/riot/account/v1/accounts/by-riot-id", async (req, res, next) => {
  try {
    // ... (código actual)
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);  // Pasar el error a next
  }
});

// Ruta para manejar la solicitud de búsqueda de jugadores por summonerName
app.get("/api/lol/summoner/v4/summoners/by-name", async (req, res, next) => {
  try {
    // ... (código actual)
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);  // Pasar el error a next
  }
});

// Ruta para manejar la solicitud de envío de correos electrónicos
app.post("/send-email", async (req, res, next) => {
  try {
    // ... (código actual)
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);  // Pasar el error a next
  }
});

// Iniciar el servidor en el puerto que quieras
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Middleware para manejar errores no capturados
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});