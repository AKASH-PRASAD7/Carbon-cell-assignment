import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  password: string;
}
export const generateJwtToken = function (user: IUser) {
  try {
    return jwt.sign({ user: user._id.toString() }, JWT_SECRET.toString(), {
      expiresIn: "7d",
    });
  } catch (error: any) {
    console.log("Error in generateJwtToken ", error.message);
    throw new Error(`Error in generateJwtToken  ${error.message}`);
  }
};
