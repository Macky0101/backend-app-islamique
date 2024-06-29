const express = require('express');
const router = express.Router();
const { auth, predicateurAuth, superadminAuth } = require('../middleware/auth');
const sermonController = require('../controllers/sermonController');
const upload = require('../middleware/upload');

// Routes pour la gestion des sermons
router.post('/', auth, upload.fields([{ name: 'audio' }, { name: 'video' }]), sermonController.addSermon);
router.put('/:id', auth, sermonController.updateSermon);
router.delete('/:id', auth, sermonController.deleteSermon);
router.get('/', sermonController.getSermons);
router.get('/predicateur/:predicateurId', sermonController.getSermonsByPredicateur);

module.exports = router;
