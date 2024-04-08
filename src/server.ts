import express, { Request, Response, Application, NextFunction } from "express";
import dbConnect from "./utils/dbConnect.js";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import { customLogger, requestLoggerMiddleware } from "./middleware/logger.js";
import cookieParser from "cookie-parser";
import swaggerui from "swagger-ui-express";
import { PORT, HOSTNAME } from "./config/config.js";
import auth from "./routes/auth.js";
import product from "./routes/product.js";
import web3 from "./routes/web3.js";

const app: Application = express();

//middlewares
app.use(requestLoggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((err: any, req: Request, res: Response, next: any) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).send({ message: "Invalid JSON" });
  }
  next();
});
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

//Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Test Api",
      version: "1.0.0",
      description: "Test API",
    },

    servers: [
      {
        url: `http://${HOSTNAME}:${PORT}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const openapiSpecification = swaggerJsdoc(options);

// Swagger UI
app.use("/api-docs", swaggerui.serve, swaggerui.setup(openapiSpecification));

//routes
app.use("/api/auth", auth);
app.use("/api", product);
app.use("/api", web3);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Fire");
});

//Not Found
app.use((req: Request, res: Response) => {
  res.status(404).send("404 Not Found");
});

app.listen(PORT, () => {
  dbConnect();
  customLogger(`Server is running on http://${HOSTNAME}:${PORT}`, "green");
});
