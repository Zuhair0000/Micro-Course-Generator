const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const lessonsRoutes = require("./routes/lessonsRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_API_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonsRoutes);

const PORT = process.env.DB_PORT || 3001;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
