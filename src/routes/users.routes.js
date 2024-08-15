import express from 'express';
import { createTransaction, deleteTransaction, getAllTransactions, getTransactionById, updateTransaction } from "../controllers/transactions.services"
import { validateProductBody, validateProductIfPresent, validateTransactionParams, validateUserBody, validateUserIfPresent } from '../middlewares/global.middleware';
export const transactionsRouter = express.Router();

transactionsRouter.get('/transactions', getAllTransactions);
transactionsRouter.get('/transactions/:id', validateTransactionParams, getTransactionById);
transactionsRouter.post('/transactions', validateUserBody, validateProductBody, createTransaction);
transactionsRouter.patch('/transactions/:id', validateTransactionParams, validateUserIfPresent, validateProductIfPresent, updateTransaction);
transactionsRouter.delete('/transactions/:id', validateTransactionParams, deleteTransaction);
transactionsRouter.delete('/transactions', deleteAllStockTransactions);
