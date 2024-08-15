import { pool } from "../db/connection.js";

export const getAllTransactionsService = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM stock_transactions');
    return rows;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
export const getTransactionByIdService = async (id) => {
  try {
    const query = `
      SELECT * FROM stock_transactions WHERE transaction_id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
};
export const createTransactionService = async (productId, userId, quantity, type) => {
  try {
    const query = `
      INSERT INTO stock_transactions (product_id, user_id, transaction_quantity, transaction_type)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [productId, userId, quantity, type]);
    return result;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};
export const updateTransactionService = async (id, fieldsToUpdate) => {
  try {
    const { productId, userId, quantity, type } = fieldsToUpdate;
    const updates = [];
    const values = [];

    if (productId) {
      updates.push('product_id = ?');
      values.push(productId);
    }
    if (userId) {
      updates.push('user_id = ?');
      values.push(userId);
    }
    if (quantity) {
      updates.push('transaction_quantity = ?');
      values.push(quantity);
    }
    if (type) {
      updates.push('transaction_type = ?');
      values.push(type);
    }

    values.push(id);
    const query = `UPDATE stock_transactions SET ${updates.join(", ")} WHERE transaction_id = ?`;
    const [result] = await pool.execute(query, values);
    return result;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};
export const deleteTransactionService = async (id) => {
  try {
    const query = `DELETE FROM stock_transactions WHERE transaction_id = ?`;
    const [result] = await pool.execute(query, [id]);
    return result;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};
export const deleteAllTransactionsService = async () => {
  try {
    const result = await pool.execute("DELETE FROM stock_transactions");
    return result;
  } catch (error) {
    console.error('Error deleting all transactions:', error);
    throw error;
  }
};
