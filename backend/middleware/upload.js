const multer = require('multer');
const path = require('path');

// Configuration de multer pour stocker les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier de destination
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|mp3|mp4/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Fichiers images et audio seulement !');
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100000000 } // Limite de taille de fichier (100MB)
});

module.exports = upload;
