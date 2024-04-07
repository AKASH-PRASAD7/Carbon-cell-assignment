import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";
import { PORT, HOSTNAME } from "./config/config.js";
import auth from "./routes/auth.js";
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Test Api",
            version: "1.0.0",
        },
    },
    apis: ["./src/routes*.ts"],
};
const openapiSpecification = swaggerJsdoc(options);
// Swagger UI
app.use("/api-docs", swaggerui.serve, swaggerui.setup(openapiSpecification));
//routes
app.use("/auth", auth);
app.get("/", (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
});
app.listen(PORT, () => {
    console.log(`Server is Fire at http://${HOSTNAME}:${PORT}`);
});
