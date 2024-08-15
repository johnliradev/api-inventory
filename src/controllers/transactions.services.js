import { createTransactionService, deleteTransactionService, getAllTransactionsService, getTransactionByIdService, updateTransactionService } from "../services/transactions.services";

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await getAllTransactionsService();
    res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const getTransactionById = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await getTransactionByIdService(id);
    res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const createTransaction = async (req, res) => {
  try {
    const { productId, userId, transactionQuantity, transactionType } = req.body;
    const result = await createTransactionService(productId, userId, transactionQuantity, transactionType);
    res.status(201).json({ message: 'Transaction created successfully', transactionId: result.insertId });
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const fieldsToUpdate = req.body;
    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).send({ message: 'Submit at least one field to update user.' });
    }
    const result = await updateTransactionService(id, fieldsToUpdate);
    res.status(200).json({ message: 'Transaction updated successfully' });
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteTransactionService(id);
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const deleteAllTransactions = async (req, res) => {
  try {
    await deleteTransactionService();
    res.status(200).json({ message: 'All transactions deleted successfully' });
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
