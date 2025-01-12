const mongoose = require('mongoose');

let isConnected; // Tracks connection state

const dbConnect = async () => {
    if (isConnected) {
        console.log('=> Using existing database connection');
        return;
    }

    console.log('=> Establishing new database connection');
    try {
        const db = await mongoose.connect(process.env.MONGO_URI); // No need for options
        isConnected = db.connections[0].readyState; // 1 = connected
        console.log('=> Database connected');
    } catch (err) {
        console.error('=> Database connection error:', err);
        throw new Error('Database connection failed');
    }
};

module.exports = dbConnect;
