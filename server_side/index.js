const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const dbConnect = require("./config/dbConnect");
const routes = require("./routes/index");
const { app, server } = require("./socket/index");

//const app = express();
dbConnect();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// API Endpoints
app.use("/api", routes);

const PORT = process.env.PORT || 8080;


server.listen(PORT, () => {
    console.log("Server is listening on port:", PORT);
});