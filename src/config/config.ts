import "dotenv/config";

export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const TEST = process.env.NODE_ENV === "test";

export const HOSTNAME = process.env.HOSTNAME || "localhost";
export const PORT = process.env.PORT ? Number(process.env.PORT) : 12345;
export const MONGO_URI = process.env.MONGO_URI!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const INFURA_API_KEY = process.env.INFURA_API_KEY!;
export const DEPLOYED_URL = process.env.DEPLOYED_URL!;

export const server = {
  HOSTNAME,
  PORT,
  MONGO_URI,
  JWT_SECRET,
  INFURA_API_KEY,
  DEPLOYED_URL,
};
