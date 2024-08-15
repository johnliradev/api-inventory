import { Router } from "express";
import { getAllCategories, createCategory, deleteCategory, updateCategory, getCategoryById, deleteAllCategories } from "../controllers/categories.controllers.js";
import { validateCategoryParams } from "../middlewares/global.middleware.js";
export const categoriesRouter = Router()

categoriesRouter.get("/categories", getAllCategories)
categoriesRouter.post("/categories", createCategory)
categoriesRouter.delete("/categories", deleteAllCategories)
categoriesRouter.get("/categories/:id", validateCategoryParams, getCategoryById)
categoriesRouter.delete("/categories/:id", validateCategoryParams, deleteCategory)
categoriesRouter.patch("/categories/:id", validateCategoryParams, updateCategory)
