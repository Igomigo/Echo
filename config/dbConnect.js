const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection;

        connection.on("connect", () => {
            console.log("Database connected successfully");
        });

        connection.on("error", (err) => {
            console.log("Error connecting to Db:", err);
        })
    } catch (err) {
        console.error(err);
    }
}

module.exports = dbConnect;
