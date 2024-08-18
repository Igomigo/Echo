const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");

const app = express();
dbConnect();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log("Server is listening on port:", PORT);
});