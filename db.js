const mariadb = require('mariadb');

const pool = mariadb.createPool({
     host: '127.0.0.1', // On remplace 'localhost' par '127.0.0.1'
     user: 'root',      
     password: '',      // Vérifie bien que ton mot de passe est vide (par défaut sur XAMPP)
     database: 'wattshare',
     connectionLimit: 5,
     connectTimeout: 10000 // On donne un peu plus de temps pour se connecter
});

module.exports = pool;