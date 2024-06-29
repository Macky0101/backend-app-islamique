const bcrypt = require('bcryptjs');

const hash = '$2a$10$21iOsyp3A5xQC/gJXUCmBu0AQSJ0R.a.9ow6krMwYaDyoy8T8/BYS';

const motDePasse = 'superpassword';

bcrypt.compare(motDePasse, hash, (err, result) => {
  if (err) {
    console.error('Erreur:', err);
  } else if (result) {
    console.log('Mot de passe correct');
  } else {
    console.log('Mot de passe incorrect');
  }
});
