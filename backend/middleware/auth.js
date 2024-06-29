// middleware/auth.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Pas de jeton, autorisation refusée' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Pas de jeton, autorisation refusée' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select('-mot_de_passe');
    if (!req.admin) return res.status(401).json({ message: 'Jeton invalide' });
    next();
  } catch (err) {
    res.status(400).json({ message: 'Jeton non valide' });
  }
};

exports.superadminAuth = (req, res, next) => {
  if (req.admin.role !== 'superadmin') return res.status(403).json({ message: 'Accès refusé' });
  next();
};

exports.predicateurAuth = (req, res, next) => {
  if (!req.admin.predicateur || !req.params.predicateurId) {
    return res.status(403).json({ message: 'Accès refusé' });
  }

  if (!req.admin.predicateur.equals(req.params.predicateurId)) {
    return res.status(403).json({ message: 'Accès refusé' });
  }
  
  next();
};
