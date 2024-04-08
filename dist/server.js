import express from "express";
import dbConnect from "./utils/dbConnect.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";
import { PORT, HOSTNAME } from "./config/config.js";
import auth from "./routes/auth.js";
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).send({ message: "Invalid JSON" });
    }
    next();
});
//Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Test Api",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://${HOSTNAME}:${PORT}`,
            },
        ],
    },
    apis: ["./src/routes*.ts"],
};
const openapiSpecification = swaggerJsdoc(options);
// Swagger UI
app.use("/api-docs", swaggerui.serve, swaggerui.setup(openapiSpecification));
//routes
app.use("/auth", auth);
app.get("/", (req, res) => {
    res.send("Server is Fire");
});
app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is Fire at http://${HOSTNAME}:${PORT}`);
});
