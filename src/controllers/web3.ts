import Web3 from "web3";
import { Request, Response } from "express";
import { INFURA_API_KEY } from "../config/config.js";
import { customLogger } from "../middleware/logger.js";

const web3 = new Web3(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`);

export const getBlockNumber = async (req: Request, res: Response) => {
  try {
    const address = req.params.address;
    if (!web3.utils.isAddress(address)) {
      return res.status(400).json({ error: "Invalid Ethereum address" });
    }
    const balance = await web3.eth.getBalance(address);
    res.json({ balance: web3.utils.fromWei(balance, "ether") });
  } catch (error: any) {
    customLogger(`Error in web3 controller ${error.message}`, "red");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
