import mongoose from "mongoose";
import { MONGO_URI } from "../config/config.js";
import { customLogger } from "../middleware/logger.js";

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    customLogger("Connected to Db", "green");
  } catch (error: any) {
    customLogger(`Failed to connect to Db ${error.message}`, "red");
    throw new Error(`Failed to connect to Db ${error.message}`);
  }
};

export default dbConnect;
