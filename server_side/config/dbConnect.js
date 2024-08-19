const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        // Connect to the MongoDB database using the URI from environment variables
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Database connected successfully");

        const connection = mongoose.connection;

        // Listen for connection errors
        connection.on("error", (err) => {
            console.error("Error connecting to DB:", err);
        });
        
    } catch (err) {
        console.error("Initial connection error:", err);
    }
};

module.exports = dbConnect;
