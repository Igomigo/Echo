const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/auth");

const app = express();
dbConnect();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// API Endpoints
app.use("/api", authRouter);

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log("Server is listening on port:", PORT);
});