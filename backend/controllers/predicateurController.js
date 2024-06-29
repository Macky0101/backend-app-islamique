const Predicateur = require('../models/Predicateur');

// Création d'un prédicateur
exports.createPredicateur = async (req, res) => {
  try {
    const newPredicateur = new Predicateur(req.body);
    await newPredicateur.save();
    res.json({ message: 'Prédicateur créé avec succès', newPredicateur });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtention des informations d'un prédicateur
exports.getPredicateur = async (req, res) => {
  try {
    const predicateur = await Predicateur.findById(req.params.id);
    if (!predicateur) return res.status(404).json({ message: 'Prédicateur non trouvé' });
    res.json(predicateur);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Modification d'un prédicateur
exports.updatePredicateur = async (req, res) => {
  try {
    const predicateur = await Predicateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!predicateur) return res.status(404).json({ message: 'Prédicateur non trouvé' });
    res.json(predicateur);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Suppression d'un prédicateur
exports.deletePredicateur = async (req, res) => {
  try {
    const predicateur = await Predicateur.findByIdAndDelete(req.params.id);
    if (!predicateur) return res.status(404).json({ message: 'Prédicateur non trouvé' });
    res.json({ message: 'Prédicateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Liste de tous les prédicateurs
exports.listPredicateurs = async (req, res) => {
  try {
    const predicateurs = await Predicateur.find();
    res.json(predicateurs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
