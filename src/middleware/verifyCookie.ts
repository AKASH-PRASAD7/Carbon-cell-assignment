import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import { Request, Response, NextFunction } from "express";
import { customLogger } from "../middleware/logger.js";

const verifyCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.cookies["token"];

    if (!cookie) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Please Sign In" });
    }
    const token = jwt.verify(cookie, JWT_SECRET);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized Invalid Token" });
    }

    next();
  } catch (error: any) {
    customLogger(`Error in verifyCookie middleware ${error.message}`, "red");
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export default verifyCookie;
