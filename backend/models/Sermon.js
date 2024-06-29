const mongoose = require('mongoose');

const SermonSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  predicateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Predicateur', required: true },
  date: { type: Date, default: Date.now },
  theme: String,
  duree: Number, // Durée en minutes
  langue: String,
  nb_vues: { type: Number, default: 0 },
  nb_telechargements: { video: { type: Number, default: 0 }, audio: { type: Number, default: 0 } },
  audio_url: String,
  video_url: String
});

module.exports = mongoose.model('Sermon', SermonSchema);
