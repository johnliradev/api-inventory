import express from 'express';
import { createTransaction, deleteAllTransactions, deleteTransaction, getAllTransactions, getTransactionById, updateTransaction } from "../controllers/transactions.controllers.js"
import { validateProductBody, validateProductIfPresent, validateTransactionParams, validateUserBody, validateUserIfPresent } from '../middlewares/global.middleware.js';
export const transactionsRouter = express.Router();

transactionsRouter.get('/transactions', getAllTransactions);
transactionsRouter.delete('/transactions', deleteAllTransactions);
transactionsRouter.post('/transactions', validateUserBody, validateProductBody, createTransaction);
transactionsRouter.get('/transactions/:id', validateTransactionParams, getTransactionById);
transactionsRouter.patch('/transactions/:id', validateTransactionParams, validateUserIfPresent, validateProductIfPresent, updateTransaction);
transactionsRouter.delete('/transactions/:id', validateTransactionParams, deleteTransaction);
