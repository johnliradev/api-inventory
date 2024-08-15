import { Router } from "express";
import { createSupplier, deleteAllSuppliers, deleteSupplier, getAllSuppliers, getSupplierById, updateSupplier } from "../controllers/suppliers.controllers.js";
import { validateSupplierParams } from "../middlewares/global.middleware.js";
export const suppliersRouter = Router()

suppliersRouter.get("/suppliers", getAllSuppliers)
suppliersRouter.post("/suppliers", createSupplier)
suppliersRouter.delete("/suppliers", deleteAllSuppliers)
suppliersRouter.get("/suppliers/:id", validateSupplierParams, getSupplierById)
suppliersRouter.patch("/suppliers/:id", validateSupplierParams, updateSupplier)
suppliersRouter.delete("/suppliers/:id", validateSupplierParams, deleteSupplier)