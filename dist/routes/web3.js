import { Router } from "express";
const router = Router();
import { getBlockNumber } from "../controllers/web3.js";
/**
 * @swagger
 * /api/block/{address}:
 *   get:
 *     summary: Get block number by Ethereum address
 *     description: Retrieve the block number corresponding to the specified Ethereum address.
 *     parameters:
 *       - in: path
 *         name: address
 *         description: The Ethereum address for which to retrieve the block number.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The block number corresponding to the specified Ethereum address.
 *       '404':
 *         description: No block number found for the specified Ethereum address.
 *       '500':
 *         description: Internal server error.
 */
router.get("/block/:address", getBlockNumber);
export default router;
