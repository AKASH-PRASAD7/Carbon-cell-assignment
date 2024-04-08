var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Web3 from "web3";
import { INFURA_API_KEY } from "../config/config.js";
import { customLogger } from "../middleware/logger.js";
const web3 = new Web3(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`);
export const getBlockNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = req.params.address;
        if (!web3.utils.isAddress(address)) {
            return res.status(400).json({ error: "Invalid Ethereum address" });
        }
        const balance = yield web3.eth.getBalance(address);
        res.json({ balance: web3.utils.fromWei(balance, "ether") });
    }
    catch (error) {
        customLogger(`Error in web3 controller ${error.message}`, "red");
        res.status(500).json({ error: "Internal Server Error" });
    }
});
