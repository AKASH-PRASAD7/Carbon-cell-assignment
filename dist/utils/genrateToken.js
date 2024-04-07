import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
export const generateJwtToken = function (user) {
    try {
        return jwt.sign({ user: user._id.toString() }, JWT_SECRET.toString(), {
            expiresIn: "7d",
        });
    }
    catch (error) {
        console.log("Error in generateJwtToken ", error.message);
        throw new Error(`Error in generateJwtToken  ${error.message}`);
    }
};
