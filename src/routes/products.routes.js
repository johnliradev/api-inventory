import express from 'express';
import { createProduct, deleteAllProducts, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/products.controllers.js';
import { validateCategoryBody, validateCategoryIfPresent, validateProductParams, validateSupplierBody, validateSupplierIfPresent } from '../middlewares/global.middleware.js';

export const productsRouter = express.Router();

productsRouter.get('/products', getAllProducts);
productsRouter.post('/products', validateCategoryBody, validateSupplierBody, createProduct);
productsRouter.delete('/products', deleteAllProducts);
productsRouter.get('/products/:id', validateProductParams, getProductById);
productsRouter.patch('/products/:id', validateProductParams, validateCategoryIfPresent, validateSupplierIfPresent, updateProduct);
productsRouter.delete('/products/:id', validateProductParams, deleteProduct);