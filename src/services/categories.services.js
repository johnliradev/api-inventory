import { pool } from "../db/connection.js";

export const getAllCategoriesService = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories')
    return rows
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
export const getCategoryByIdService = async (id) => {
  try {
    const query = `
      SELECT * FROM categories WHERE category_id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
}
export const createCategoryService = async (name) => {
  try {
    const query = `
      INSERT INTO categories (category_name)
      VALUES (?)
    `;
    const [result] = await pool.execute(query, [name]);
    return result;
  } catch (error) {
    console.error('Error creating categories:', error);
    throw error;
  }
}
export const deleteCategoryService = async (id) => {
  try {
    const query = `DELETE FROM categories WHERE category_id=?`
    const [result] = await pool.execute(query, [id])
    return result
  } catch (error) {
    console.error('Error deleting categories:', error);
    throw error;
  }
}
export const updateCategoryService = async (id, name) => {
  try {
    const query = `UPDATE categories SET category_name = ? WHERE category_id = ?`

    const [result] = await pool.execute(query, [name, id])
    return result
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
}
export const deleteAllCategoriesService = async () => {
  try {
    const result = await pool.execute("DELETE FROM categories")
    return result
  } catch (error) {
    console.error('Error deleting all supplier:', error);
    throw error;
  }
}