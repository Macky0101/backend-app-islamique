const Admin = require('../models/Admin');
const Predicateur = require('../models/Predicateur');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// exports.login = async (req, res) => {
//   const { identifiant, mot_de_passe } = req.body;
//   console.log("En-têtes de la requête :", req.headers); // Vérifiez les en-têtes
//   console.log("Corps de la requête:", req.body); // Ajoutez ce log pour vérifier les données reçues

//   try {
//     const admin = await Admin.findOne({ identifiant });
//     if (!admin) return res.status(400).json({ message: 'Identifiants invalides' });

//     const isMatch = await bcrypt.compare(mot_de_passe, admin.mot_de_passe);
//     if (!isMatch) return res.status(400).json({ message: 'Identifiants invalides' });
//     console.log('Rôle de l\'admin :', admin.role);
//     const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
//     res.json({
//       token,
//       admin: {
//         id: admin._id,
//         identifiant: admin.identifiant,
//         role: admin.role,
//         predicateur: admin.predicateur
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Erreur serveur' });
//   }
// };

exports.login = async (req, res) => {
  const { identifiant, mot_de_passe } = req.body;
  console.log('Tentative de connexion pour identifiant:', identifiant);

  try {
    const admin = await Admin.findOne({ identifiant });
    if (!admin) {
      console.log('Admin non trouvé pour:', identifiant);
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    console.log('Admin trouvé:', admin);

    const isMatch = await bcrypt.compare(mot_de_passe, admin.mot_de_passe);
    if (!isMatch) {
      console.log('Mot de passe incorrect pour:', identifiant);
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    console.log('Connexion réussie pour:', identifiant, 'Rôle:', admin.role);

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
    res.json({
      token,
      admin: {
        id: admin._id,
        identifiant: admin.identifiant,
        role: admin.role,
        predicateur: admin.predicateur,
      }
    });
  } catch (err) {
    console.error('Erreur serveur:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};



// Création d'un admin par un superadmin
exports.createAdmin = async (req, res) => {
  const { identifiant, mot_de_passe, role, predicateurId } = req.body;
  console.log("Requête reçue avec les données :", req.body);

  if (!identifiant || !mot_de_passe || !role) {
    return res.status(400).json({ message: 'Les champs identifiant, mot de passe et rôle sont requis' });
  }

  try {
    let admin = await Admin.findOne({ identifiant });
    if (admin) return res.status(400).json({ message: 'L\'administrateur existe déjà' });

    if (role === 'admin' && !predicateurId) {
      return res.status(400).json({ message: 'Prédicateur ID est requis pour les admins' });
    }

    let predicateur = null;
    if (role === 'admin') {
      predicateur = await Predicateur.findById(predicateurId);
      if (!predicateur) return res.status(400).json({ message: 'Prédicateur non trouvé' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mot_de_passe, salt);

    admin = new Admin({ identifiant, mot_de_passe: hashedPassword, role, predicateur: predicateurId || null });
    await admin.save();

    console.log("Nouvel administrateur créé :", admin);

    res.json({ message: 'Administrateur créé avec succès', admin });
  } catch (err) {
    console.warn("Erreur serveur :", err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtention des informations d'un admin
exports.getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-mot_de_passe').populate('predicateur');
    if (!admin) return res.status(404).json({ message: 'Administrateur non trouvé' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Modification d'un admin par un superadmin
exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admin) return res.status(404).json({ message: 'Administrateur non trouvé' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Suppression d'un admin par un superadmin
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Administrateur non trouvé' });
    res.json({ message: 'Administrateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Changement de mot de passe
exports.changePassword = async (req, res) => {
  const { ancienMotDePasse, nouveauMotDePasse } = req.body;
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) return res.status(404).json({ message: 'Administrateur non trouvé' });

    const isMatch = await bcrypt.compare(ancienMotDePasse, admin.mot_de_passe);
    if (!isMatch) return res.status(400).json({ message: 'Ancien mot de passe incorrect' });

    admin.mot_de_passe = await bcrypt.hash(nouveauMotDePasse, 10);
    await admin.save();
    res.json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
// Liste des administrateurs
exports.listAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-mot_de_passe').populate('predicateur');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.logout = (req, res) => {
  res.json({ message: 'Déconnexion réussie' });
};
