const bcrypt = require('bcryptjs');

const motDePasse = 'superpassword';

bcrypt.hash(motDePasse, 10, (err, hash) => {
  if (err) {
    console.error('Erreur:', err);
  } else {
    console.log('Hachage généré:', hash);
  }
});
