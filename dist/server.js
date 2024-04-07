import express from "express";
import { PORT, HOSTNAME } from "./config/config.js";
const app = express();
app.get("/", (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
});
app.listen(PORT, () => {
    console.log(`Server is Fire at http://${HOSTNAME}:${PORT}`);
});
