import { pool } from "../db/connection.js";

export const getAllSuppliersService = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM suppliers')
    return rows
  } catch (error) {
    console.error('Error fetching suppliers', error)
    throw error
  }
}
export const getSupplierByIdService = async (id) => {
  try {
    const query = `
      SELECT * FROM suppliers WHERE supplier_id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows
  } catch (error) {
    console.error('Error fetching supplier:', error);
    throw error;
  }
}
export const createSupplierService = async (name, contact, email) => {
  try {
    const query = `
      INSERT INTO suppliers (supplier_name, supplier_contact, supplier_email)
      VALUES (?, ?, ?)
    `
    const [result] = await pool.execute(query, [name, contact, email])
    return result
  } catch (error) {
    console.error('Error creating supplier:', error);
    throw error;
  }
}

export const updateSupplierService = async (id, fieldsToUpdate) => {
  try {
    const { name, contact, email } = fieldsToUpdate
    const updates = []
    const values = []

    if (name) {
      updates.push('supplier_name = ?')
      values.push(name)
    }
    if (contact) {
      updates.push('supplier_contact = ?')
      values.push(contact)
    }
    if (email) {
      updates.push('supplier_email = ?')
      values.push(email)
    }
    values.push(id);

    const query = `UPDATE suppliers SET ${updates.join(", ")} WHERE supplier_id = ?`
    const [result] = await pool.execute(query, values)
    return result

  } catch (error) {
    console.error('Error updating supplier:', error);
    throw error;
  }
}
export const deleteSupplierService = async (id) => {
  try {
    const query = `DELETE FROM suppliers WHERE supplier_id = ?`
    const result = await pool.execute(query, [id])
    return result
  } catch (error) {
    console.error('Error deleting supplier:', error);
    throw error;
  }
}
export const deleteAllSuppliersService = async () => {
  try {
    const result = await pool.execute("DELETE FROM suppliers")
    return result
  } catch (error) {
    console.error('Error deleting all supplier:', error);
    throw error;
  }
}