// createSuperAdmin.js
const mongoose = require('mongoose');
const Admin = require('./backend/models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connecté à MongoDB');
    
    const superAdmin = new Admin({
      identifiant: 'superadmin',
      mot_de_passe: 'superpassword',
      role: 'superadmin'
    });

    try {
      await superAdmin.save();
      console.log('Super admin créé:', superAdmin);
    } catch (error) {
      console.error('Erreur lors de la création du super admin:', error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));
