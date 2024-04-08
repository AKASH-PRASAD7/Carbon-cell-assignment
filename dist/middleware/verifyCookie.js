var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import { customLogger } from "../middleware/logger.js";
const verifyCookie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        customLogger(`Error in verifyCookie middleware ${error.message}`, "red");
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
export default verifyCookie;
