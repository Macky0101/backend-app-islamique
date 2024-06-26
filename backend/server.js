const express = require('express');
const connectDB = require('./config/db');
const dotenv = require("dotenv").config();
const authRoutes = require('./routes/auth');
const port = 5000;
const app = express();
// dotenv.config();

// Connexion à la BD
connectDB();

// Middleware pour traiter les données de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));
app.use('/api/auth', authRoutes);

// Lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port " + port));
