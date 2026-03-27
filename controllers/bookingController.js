const db = require('../db');

exports.createReservation = async (req, res) => {
    const { user_id, station_id, start_time, end_time } = req.body;

    // LOG de contrôle pour voir ce qui arrive vraiment
    console.log("📥 Requête reçue pour station_id :", station_id);

    try {
        const sql = "INSERT INTO reservations (user_id, station_id, start_time, end_time) VALUES (?, ?, ?, ?)";
        
        // On utilise db.query. Si ça échoue, ça va directement dans le "catch"
        db.query(sql, [user_id || 1, station_id, start_time, end_time], (err, result) => {
            if (err) {
                console.error("❌ Erreur MariaDB :", err.sqlMessage);
                return res.status(400).json({ 
                    error: "L'ID station '" + station_id + "' n'existe pas dans la table stations." 
                });
            }
            console.log("✅ Réservation réussie ! ID:", result.insertId);
            return res.status(201).json({ message: "Succès", id: result.insertId });
        });

    } catch (error) {
        console.error("🔥 Erreur critique évitée :", error.message);
        res.status(500).json({ error: "Erreur serveur interne" });
    }
};