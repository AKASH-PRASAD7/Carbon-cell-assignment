import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.js";

const router = Router();

/**
 * @swagger
 * /auth/signup:
 *  post:
 *    description: Use to login to the application
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.post("/signup", signUp);

/**
 * @swagger
 * /auth/signin:
 *  post:
 *    description: Use to login to the application
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.post("/signin", signIn);

/**
 * @swagger
 * /auth/signout:
 *  get:
 *    description: Use to login to the application
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get("/signout", signOut);

export default router;
