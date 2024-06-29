// models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  identifiant: { type: String, required: true, unique: true },
  mot_de_passe: { type: String, required: true },
  role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
  predicateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Predicateur' } // Référence au prédicateur
});

// Hashage du mot de passe avant sauvegarde
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('mot_de_passe')) return next();
  const salt = await bcrypt.genSalt(10);
  this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, salt);
  next();
});

module.exports = mongoose.model('Admin', AdminSchema);
