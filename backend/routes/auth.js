const express = require('express');
const router = express.Router();
const { auth, superadminAuth } = require('../middleware/auth');
const { login, createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin } = require('../controllers/authController');

// Admin login
router.post('/login', login);

// Create admin (superadmin only)
router.post('/create-admin', createAdmin);
// router.post('/create-admin', auth, superadminAuth, createAdmin);

// Get all admins (superadmin only)
router.get('/admins',  getAdmins);

// Get admin by ID (superadmin only)
router.get('/admin/:id',  getAdminById);

// Update admin (superadmin only)
router.put('/admin/:id', updateAdmin);

// Delete admin (superadmin only)
router.delete('/admin/:id',deleteAdmin);

module.exports = router;
