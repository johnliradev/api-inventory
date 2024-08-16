import { Router } from "express";
import {
  createUser,
  deleteAllUsers,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser
} from "../controllers/users.controllers.js";
import { validateEmail, validateUserParams } from "../middlewares/global.middleware.js";
export const usersRouter = Router();

usersRouter.get("/users", getAllUsers);
usersRouter.post("/users", validateEmail, createUser);
usersRouter.delete("/users", deleteAllUsers);
usersRouter.get("/users/:id", validateUserParams, getUserById);
usersRouter.patch("/users/:id", validateUserParams, validateEmail, updateUser);
usersRouter.delete("/users/:id", validateUserParams, deleteUser);
