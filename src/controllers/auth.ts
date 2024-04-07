import User from "../models/user.js";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/managePassword.js";
import { generateJwtToken, IUser } from "../utils/genrateToken.js";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    //check if user already exist
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist" });
    }
    //hash password
    const hashedPassword = await hashPassword(password);

    //create user
    const newUser: IUser = await User.create({
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
    const token = await generateJwtToken(newUser);
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
  } catch (error: any) {
    console.log("Error in signUp controller ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }
    //compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    //send cookie
    const token = await generateJwtToken(user);
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
  } catch (error: any) {
    console.log("Error in signIn controller ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Sign out successfully" });
  } catch (error: any) {
    console.log("Error in signOut controller ", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
