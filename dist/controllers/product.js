var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { customLogger } from "../middleware/logger.js";
export const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = "https://dummyjson.com/products";
        const response = yield fetch(url);
        const data = yield response.json();
        if (!data) {
            return res
                .status(404)
                .json({ success: false, message: "No products found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "A list of products", data });
    }
    catch (error) {
        customLogger(`Error in getAllProducts controller ${error.message}`, "red");
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
export const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const url = `https://dummyjson.com/products/${id}`;
        const response = yield fetch(url);
        const data = yield response.json();
        if (!data) {
            return res
                .status(404)
                .json({ success: false, message: "No product found" });
        }
        return res.status(200).json({ success: true, message: "A product", data });
    }
    catch (error) {
        customLogger(`Error in getProductById controller ${error.message}`, "red");
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
export const getProductPerPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.query;
        const pageNumber = parseInt(page, 10) === 0
            ? 1
            : parseInt(page, 10) * 10;
        const url = `https://dummyjson.com/products?limit=10&skip=${pageNumber === 10 ? 0 : pageNumber}`;
        const response = yield fetch(url);
        const data = yield response.json();
        if (!data) {
            return res
                .status(404)
                .json({ success: false, message: "No products found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "A list of products", data });
    }
    catch (error) {
        customLogger(`Error in getProductByPage controller ${error.message}`, "red");
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
export const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        const url = `https://dummyjson.com/products/search?q=${query}`;
        const response = yield fetch(url);
        const data = yield response.json();
        if (!data) {
            return res
                .status(404)
                .json({ success: false, message: "No products found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "A list of products", data });
    }
    catch (error) {
        customLogger(`Error in searchProduct controller ${error.message}`, "red");
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
export const filterProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { select } = req.query;
        const { page } = req.query;
        const url = `https://dummyjson.com/products?limit=10&skip=${page}&select=${select}`;
        const response = yield fetch(url);
        const data = yield response.json();
        if (!data) {
            return res
                .status(404)
                .json({ success: false, message: "No products found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "A list of products", data });
    }
    catch (error) {
        customLogger(`Error in filterProduct controller ${error.message}`, "red");
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
export const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const url = `https://dummyjson.com/products?category=${category}`;
        const response = yield fetch(url);
        const data = yield response.json();
        if (!data) {
            return res
                .status(404)
                .json({ success: false, message: "No products found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "A list of products", data });
    }
    catch (error) {
        customLogger(`Error in getProductsByCategory controller ${error.message}`, "red");
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});
