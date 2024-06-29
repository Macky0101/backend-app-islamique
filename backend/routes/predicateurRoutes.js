const express = require('express');
const router = express.Router();
const { auth, superadminAuth, predicateurAuth } = require('../middleware/auth');
const predicateurController = require('../controllers/predicateurController');

// Routes pour la gestion des prédicateurs
router.post('/create', auth, superadminAuth, predicateurController.createPredicateur);
router.get('/:id', auth, predicateurController.getPredicateur);
router.put('/:id', auth,superadminAuth, predicateurController.updatePredicateur);
router.delete('/:id', auth, superadminAuth, predicateurController.deletePredicateur);
router.get('/', auth, predicateurController.listPredicateurs);

module.exports = router;
