const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/index");

const app = express();
dbConnect();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

// API Endpoints
app.use("/api", authRouter);

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log("Server is listening on port:", PORT);
});