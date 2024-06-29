const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Chargement des variables d'environnement
dotenv.config();

const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.path}`);
  console.log('Corps de la requête:', req.body);
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir les fichiers statiques

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => {
  console.log('Connecté à MongoDB');
}).catch((err) => {
  console.error('Erreur de connexion à MongoDB', err);
});

// Routes
const adminRoutes = require('./routes/adminRoutes');
const predicateurRoutes = require('./routes/predicateurRoutes');
const sermonRoutes = require('./routes/sermonRoutes');

// // Endpoint de test
// app.post('/test', (req, res) => {
//   console.log("Requête reçue avec les données :", req.body);
//   res.json({ message: 'Données reçues', data: req.body });
// });

app.use('/api/admins', adminRoutes);
app.use('/api/predicateurs', predicateurRoutes);
app.use('/api/sermons', sermonRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
