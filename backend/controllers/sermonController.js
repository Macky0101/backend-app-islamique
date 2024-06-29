const Sermon = require('../models/Sermon');
const fs = require('fs');

// Ajout d'un sermon avec fichiers audio et vidéo
exports.addSermon = async (req, res) => {
  try {
    const audioFile = req.files && req.files.audio ? req.files.audio[0].path : null;
    const videoFile = req.files && req.files.video ? req.files.video[0].path : null;

    const newSermon = new Sermon({
      titre: req.body.titre,
      predicateur: req.body.predicateur,
      theme: req.body.theme,
      duree: req.body.duree,
      langue: req.body.langue,
      audio_url: audioFile,
      video_url: videoFile || req.body.video,
    });

    await newSermon.save();
    res.status(201).json(newSermon);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l’ajout du sermon' });
  }
};


// Modification d'un sermon
exports.updateSermon = async (req, res) => {
  try {
    const sermon = await Sermon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sermon) return res.status(404).json({ message: 'Sermon non trouvé' });
    res.json(sermon);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteSermon = async (req, res) => {
  try {
    const sermon = await Sermon.findById(req.params.id);
    if (!sermon) {
      return res.status(404).json({ message: 'Sermon non trouvé' });
    }

    // Supprimer les fichiers audio et vidéo du serveur si présents
    if (sermon.audio_url && fs.existsSync(sermon.audio_url)) {
      fs.unlinkSync(sermon.audio_url);
    }
    if (sermon.video_url && fs.existsSync(sermon.video_url)) {
      fs.unlinkSync(sermon.video_url);
    }

    await Sermon.deleteOne({ _id: sermon._id }); // Supprimer le sermon de la base de données

    res.json({ message: 'Sermon supprimé avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression du sermon:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression du sermon' });
  }
};
// Obtention de la liste des sermons
exports.getSermons = async (req, res) => {
  try {
    const sermons = await Sermon.find().populate('predicateur');
    res.json(sermons);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtention des sermons par prédicateur
exports.getSermonsByPredicateur = async (req, res) => {
  try {
    const sermons = await Sermon.find({ predicateur: req.params.predicateurId }).populate('predicateur');
    res.json(sermons);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
