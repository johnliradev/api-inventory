import { pool } from "../db/connection.js";
import bcrypt from "bcrypt"

export const getAllUsersService = async () => {
  try {
    const [rows] = await pool.execute('SELECT user_id, user_name, user_email, user_role, created_at, updated_at FROM users');
    return rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
export const getUserByIdService = async (id) => {
  try {
    const query = 'SELECT user_id, user_name, user_email, user_role, created_at, updated_at FROM users WHERE user_id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};
export const createUserService = async (name, email, password, role) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const query = `
      INSERT INTO users (user_name,  user_email, user_password, user_role)
      VALUES (?,  ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [name, email, hashedPassword, role]);
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
export const updateUserService = async (id, fieldsToUpdate) => {
  try {
    const { name, email, password, role } = fieldsToUpdate;
    const updates = [];
    const values = [];

    if (name) {
      updates.push('user_name = ?');
      values.push(name);
    }
    if (email) {
      updates.push('user_email = ?');
      values.push(email);
    }
    if (password) {
      updates.push('user_password = ?');
      values.push(password);
    }
    if (role) {
      updates.push('user_role = ?');
      values.push(role);
    }
    values.push(id);

    const query = `UPDATE users SET ${updates.join(", ")} WHERE user_id = ?`;
    const [result] = await pool.execute(query, values);
    return result;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
export const deleteUserService = async (id) => {
  try {
    const query = 'DELETE FROM users WHERE user_id = ?';
    const result = await pool.execute(query, [id]);
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
export const deleteAllUsersService = async () => {
  try {
    const result = await pool.execute('DELETE FROM users');
    return result;
  } catch (error) {
    console.error('Error deleting all users:', error);
    throw error;
  }
};