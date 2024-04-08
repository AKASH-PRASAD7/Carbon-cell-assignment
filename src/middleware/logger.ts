import chalk from "chalk";
import { Request, Response, NextFunction } from "express";
export const customLogger = (message: string, color: string = "white") => {
  const timestamp = new Date().toISOString();
  console.log(`${(chalk as any)[color](`[${timestamp}]`)} ${message}`);
};

// Request Logger Middleware
export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  customLogger(`[${req.method}] ${req.url}`, "yellow"); // Log request method and URL
  next();
};
