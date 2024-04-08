import { Request, Response, NextFunction } from "express";

const validate =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (error: any) {
      console.log("Error at schema validation", error.errors[0].message);
      return res.status(400).json({ message: error.errors[0].message });
    }
  };

export default validate;
