const pool = require('../db');
const logger = require('../logger');

// Ajouter une nouvelle borne (Réservé Admin)
exports.addStation = async (req, res) => {
    const { name, address, latitude, longitude, power_kw, status } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const query = "INSERT INTO stations (name, address, latitude, longitude, power_kw, status) VALUES (?, ?, ?, ?, ?, ?)";
        await conn.query(query, [name, address, latitude, longitude, power_kw, status]);
        logger.info(`✅ Nouvelle borne ajoutée par l'admin : ${name}`);
        res.json({ message: "Borne ajoutée avec succès !" });
    } catch (err) {
        logger.error("Erreur ajout borne", err);
        res.status(500).json({ error: "Erreur serveur" });
    } finally {
        if (conn) conn.end();
    }
};

// Récupérer toutes les bornes de NOTRE base
exports.getAllStations = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM stations");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération" });
    } finally {
        if (conn) conn.end();
    }
};