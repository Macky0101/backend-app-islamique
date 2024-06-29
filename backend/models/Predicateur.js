const mongoose = require('mongoose');

const PredicateurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  photo: String,
  biographie: String,
  langue: String
});

module.exports = mongoose.model('Predicateur', PredicateurSchema);
