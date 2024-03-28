import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "https://conect2.netlify.app",
  })
);

const apiKey = "RGAPI-ac16c292-d2bb-45bd-8bef-6248f45782eb";

app.get("/riot/account/v1/accounts/by-riot-id", async (req, res) => {
  try {
    const { gameName, tagLine } = req.query;
    const response = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
        gameName
      )}/${encodeURIComponent(tagLine)}?api_key=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching player data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

app.get("/lol/league/v4/entries/by-summoner/:encryptedSummonerId", async (req, res) => {
  try {
    const { encryptedSummonerId } = req.params;
    const response = await axios.get(
      `https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/${encodeURIComponent(
        encryptedSummonerId
      )}?api_key=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching league data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
