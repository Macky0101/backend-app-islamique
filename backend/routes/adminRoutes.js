const express = require('express');
const router = express.Router();
const { auth, superadminAuth } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Route pour la connexion
router.post('/login', adminController.login);

// Routes pour la gestion des admins par un superadmin
router.post('/create',auth, superadminAuth,adminController.createAdmin);
router.get('/:id',  auth, superadminAuth,adminController.getAdmin);
router.put('/:id', auth, superadminAuth, adminController.updateAdmin);
router.delete('/:id', auth, superadminAuth, adminController.deleteAdmin);
router.get('/', auth,superadminAuth, adminController.listAdmins);
// Routes pour la gestion du mot de passe et déconnexion
router.put('/change-password', auth, adminController.changePassword);
router.post('/logout', adminController.logout);

module.exports = router;
