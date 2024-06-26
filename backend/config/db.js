const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connecté");
    } catch (err) {
        console.error(err);
        process.exit(1); // Sortie avec une erreur
    }
};

module.exports = connectDB;
