import mongoose from "mongoose";
import { MONGO_URI } from "../config/config.js";

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected To MongoDb!");
  } catch (error: any) {
    console.log(`Failed to connect to Db: ${error.message}`);
    throw new Error(`Failed to connect to Db ${error.message}`);
  }
};

export default dbConnect;
