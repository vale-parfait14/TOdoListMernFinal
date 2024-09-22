// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const path = require("path");
const cors = require('cors');
const connectDB = require('./config/db');

// Charger le fichier .env
dotenv.config();

const app = express();

// Connexion à MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Import des routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get("/",(req,res) => {
    app.use(express.static(path.resolve(__direname,"frontend","buid")));
    res.sendFile(path.relative(__dirname,"frontend","build",".html"));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
