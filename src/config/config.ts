import "dotenv/config";

export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const TEST = process.env.NODE_ENV === "test";

export const HOSTNAME = process.env.HOSTNAME || "localhost";
export const PORT = process.env.PORT ? Number(process.env.PORT) : 12345;

export const server = {
  HOSTNAME,
  PORT,
};
