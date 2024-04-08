import chalk from "chalk";
export const customLogger = (message, color = "white") => {
    const timestamp = new Date().toISOString();
    console.log(`${chalk[color](`[${timestamp}]`)} ${message}`);
};
// Request Logger Middleware
export const requestLoggerMiddleware = (req, res, next) => {
    customLogger(`[${req.method}] ${req.url}`, "yellow"); // Log request method and URL
    next();
};
