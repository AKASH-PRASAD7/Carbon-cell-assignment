import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.js";
import validateData from "../middleware/schemaValidate.js";
import { signInSchema, signUpSchema } from "../validator/auth.js";
const router = Router();
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: User already exists
 *       '422':
 *         description: Failed to sign up
 *       '500':
 *         description: Server error
 */
router.post("/signup", validateData(signUpSchema), signUp);
/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in to the application
 *     description: Use this endpoint to sign in to the application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Invalid credentials
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */
router.post("/signin", validateData(signInSchema), signIn);
/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: Sign out from the application
 *     description: Use this endpoint to sign out from the application.
 *     responses:
 *       '200':
 *         description: Sign out successful
 *       '500':
 *         description: Server error
 */
router.post("/signout", signOut);
export default router;
