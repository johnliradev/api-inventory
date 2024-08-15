import { pool } from "../db/connection.js";

export const getAllProductsService = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products');
    return rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductByIdService = async (id) => {
  try {
    const query = `
      SELECT * FROM products WHERE product_id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const createProductService = async (name, description, price, quantity, categoryId, supplierId) => {
  try {
    const query = `
      INSERT INTO products (product_name, product_description, product_price, product_quantity, category_id, supplier_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [name, description, price, quantity, categoryId, supplierId]);
    return result;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProductService = async (id, fieldsToUpdate) => {
  try {
    const { name, description, price, quantity, categoryId, supplierId } = fieldsToUpdate;
    const updates = [];
    const values = [];

    if (name) {
      updates.push('product_name = ?');
      values.push(name);
    }
    if (description) {
      updates.push('product_description = ?');
      values.push(description);
    }
    if (price) {
      updates.push('product_price = ?');
      values.push(price);
    }
    if (quantity) {
      updates.push('product_quantity = ?');
      values.push(quantity);
    }
    if (categoryId) {
      updates.push('category_id = ?');
      values.push(categoryId);
    }
    if (supplierId) {
      updates.push('supplier_id = ?');
      values.push(supplierId);
    }
    values.push(id);
    const query = `UPDATE products SET ${updates.join(", ")} WHERE product_id = ?`;
    const [result] = await pool.execute(query, values);
    return result;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};


export const deleteProductService = async (id) => {
  try {
    const query = `DELETE FROM products WHERE product_id = ?`;
    const [result] = await pool.execute(query, [id]);
    return result;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const deleteAllProductsService = async () => {
  try {
    const result = await pool.execute("DELETE FROM products");
    return result;
  } catch (error) {
    console.error('Error deleting all products:', error);
    throw error;
  }
};
