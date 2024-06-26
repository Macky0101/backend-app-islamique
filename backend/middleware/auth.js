const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'Pas de jeton, autorisation refusée' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select('-mot_de_passe');
    if (!req.admin) return res.status(401).json({ message: 'Invalid token' });
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

exports.superadminAuth = (req, res, next) => {
  if (req.admin.role !== 'superadmin') return res.status(403).json({ message: 'Access denied' });
  next();
};
