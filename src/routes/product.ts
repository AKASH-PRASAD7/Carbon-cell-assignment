import { Router } from "express";
const router = Router();
import {
  getAllProducts,
  getProductById,
  getProductPerPage,
  searchProduct,
  filterProduct,
  getProductsByCategory,
} from "../controllers/product.js";

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get all products
 *    description: Use this endpoint to get all products
 *    responses:
 *      '200':
 *        description: A list of products
 *      '500':
 *        description: Server error
 *      '404':
 *        description: No products found
 */

router.get("/products", getAllProducts);

/**
 * @swagger
 * /api/products/page:
 *  get:
 *    summary: Get products per page
 *    description: Use this endpoint to get products per page
 *    parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A list of products
 *      '500':
 *        description: Server error
 *      '404':
 *        description: No products found
 */

router.get("/products/page", getProductPerPage);

/**
 * @swagger
 * /api/products/search:
 *  get:
 *    summary: Search products
 *    description: Use this endpoint to search for products.
 *    parameters:
 *      - in: query
 *        name: query
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A list of products matching the search query
 *      '404':
 *        description: No products found
 *      '500':
 *        description: Server error
 */

router.get("/products/search", searchProduct);

/**
 * @swagger
 * /api/products/filter:
 *  get:
 *    summary: Filter products
 *    description: Use this endpoint to filter products based on certain criteria.
 *    parameters:
 *      - in: query
 *        name: select
 *        required: true
 *        description: title, price, category, description etc
 *        schema:
 *          type: string
 *      - in: query
 *        name: page
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A list of filtered products
 *      '404':
 *        description: No products found
 *      '500':
 *        description: Server error
 */

router.get("/products/filter", filterProduct);

/**
 * @swagger
 * /api/products/category/{category}:
 *   get:
 *     summary: Get products by category
 *     description: Use this endpoint to get products belonging to a specific category.
 *     parameters:
 *       - in: path
 *         name: category
 *         description: The category of products to retrieve (e.g., smartphone, laptop, tablet, etc.)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of products belonging to the specified category
 *       '404':
 *         description: No products found for the specified category
 *       '500':
 *         description: Server error
 */

router.get("/products/category/:category", getProductsByCategory);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by id
 *    description: Use this endpoint to get a product by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A product
 *      '500':
 *        description: Server error
 *      '404':
 *        description: No product found
 */

router.get("/products/:id", getProductById);

export default router;
