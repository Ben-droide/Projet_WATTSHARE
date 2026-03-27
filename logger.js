// logger.js
const isProduction = process.env.NODE_ENV === 'production';

const logger = {
    info: (message, data = "") => {
        if (!isProduction) {
            console.log(`[INFO] ${new Date().toLocaleTimeString()} - ${message}`, data);
        }
    },
    error: (message, error = "") => {
        // On affiche TOUJOURS les erreurs, même en production
        console.error(`[ERROR] ${new Date().toLocaleTimeString()} - ${message}`, error);
    },
    warn: (message, data = "") => {
        if (!isProduction) {
            console.warn(`[WARN] ${new Date().toLocaleTimeString()} - ${message}`, data);
        }
    }
};

module.exports = logger;