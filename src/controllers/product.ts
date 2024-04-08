import { Request, Response } from "express";
import { customLogger } from "../middleware/logger.js";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const url = "https://dummyjson.com/products";
    const response = await fetch(url);
    const data = await response.json();
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "A list of products", data });
  } catch (error: any) {
    customLogger(`Error in getAllProducts controller ${error.message}`, "red");
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const url = `https://dummyjson.com/products/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "No product found" });
    }
    return res.status(200).json({ success: true, message: "A product", data });
  } catch (error: any) {
    customLogger(`Error in getProductById controller ${error.message}`, "red");
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductPerPage = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;

    const pageNumber =
      parseInt(page as string, 10) === 0
        ? 1
        : parseInt(page as string, 10) * 10;

    const url = `https://dummyjson.com/products?limit=10&skip=${
      pageNumber === 10 ? 0 : pageNumber
    }`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "A list of products", data });
  } catch (error: any) {
    customLogger(
      `Error in getProductByPage controller ${error.message}`,
      "red"
    );
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const searchProduct = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    const url = `https://dummyjson.com/products/search?q=${query}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "A list of products", data });
  } catch (error: any) {
    customLogger(`Error in searchProduct controller ${error.message}`, "red");
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const filterProduct = async (req: Request, res: Response) => {
  try {
    const { select } = req.query;
    const { page } = req.query;
    const url = `https://dummyjson.com/products?limit=10&skip=${page}&select=${select}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "A list of products", data });
  } catch (error: any) {
    customLogger(`Error in filterProduct controller ${error.message}`, "red");
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const url = `https://dummyjson.com/products?category=${category}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "A list of products", data });
  } catch (error: any) {
    customLogger(
      `Error in getProductsByCategory controller ${error.message}`,
      "red"
    );
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
