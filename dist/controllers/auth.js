var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.js";
import { comparePassword, hashPassword } from "../utils/managePassword.js";
import { generateJwtToken } from "../utils/genrateToken.js";
export const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }
        //check if user already exist
        const user = yield User.findOne({ email });
        if (user) {
            return res
                .status(409)
                .json({ success: false, message: "User already exist" });
        }
        //hash password
        const hashedPassword = yield hashPassword(password);
        //create user
        const newUser = yield User.create({
            fullName,
            email,
            password: hashedPassword,
        });
        if (!newUser) {
            return res
                .status(422)
                .json({ success: false, message: "Failed to sign up" });
        }
        //Send cookie
        const token = yield generateJwtToken(newUser);
        const oneDay = 24 * 60 * 60 * 1000;
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDay),
            secure: true, // set to true if your using https
            sameSite: "none",
        });
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            },
        });
    }
    catch (error) {
        console.log("Error in signUp controller ", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
export const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }
        //check if user exist
        const user = yield User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User doesn't exist" });
        }
        //compare password
        const isMatch = yield comparePassword(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        }
        //send cookie
        const token = yield generateJwtToken(user);
        const oneDay = 24 * 60 * 60 * 1000;
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDay),
            secure: true, // set to true if your using https
            sameSite: "none",
        });
        return res.status(200).json({
            success: true,
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        });
    }
    catch (error) {
        console.log("Error in signIn controller ", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
export const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token");
        return res
            .status(200)
            .json({ success: true, message: "Sign out successfully" });
    }
    catch (error) {
        console.log("Error in signOut controller ", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
