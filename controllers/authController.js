const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');


const SECRET_KEY = process.env.JWT_SECRET; 

exports.login = async (req, res) => {
    const { username, password } = req.body;
    let conn;

    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM users WHERE username = ?", [username]);
        
        if (rows.length === 0) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // Au lieu d'utiliser SECRET_KEY (la variable fixe en haut)
const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET || 'MaCleDeSecoursSiLeEnvNeMarchePas', // 👈 On force la lecture ici
    { expiresIn: '1h' }
);

        res.json({ 
            message: "Connexion réussie", 
            token: token, 
            role: user.role,
            username: user.username
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    } finally {
        if (conn) conn.end();
    }
};