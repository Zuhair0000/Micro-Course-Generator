const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_API_URL,
    credentials: true,
  })
);
app.use(express.json());

const PORT = process.env.DB_PORT || 5432;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
