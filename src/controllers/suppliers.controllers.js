import { createSupplierService, deleteAllSuppliersService, deleteSupplierService, getAllSuppliersService, getSupplierByIdService, updateSupplierService } from "../services/suppliers.services.js";

export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await getAllSuppliersService()
    if (!suppliers.length) {
      return res.status(404).send({ message: "There are no registered Suppliers" })
    }
    res.status(200).send(suppliers)
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`)
  }
}
export const getSupplierById = async (req, res) => {
  try {
    const id = req.params.id
    const supplier = await getSupplierByIdService(id)
    return res.status(200).send(supplier)
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`)
  }
}
export const createSupplier = async (req, res) => {
  try {
    const { name, contact, email } = req.body
    if (!name || !contact || !email) {
      return res.status(400).send({ message: "Submit all fields to create suppiler." })
    }
    const supplier = await createSupplierService(name, contact, email)
    console.log(supplier.insertId)
    return res.status(201).send({
      message: "Suppler successfully created",
      insertId: supplier.insertId
    })
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`)
  }
}
export const updateSupplier = async (req, res) => {
  try {
    const id = req.params.id
    const fieldsToUpdate = req.body;
    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).send({ message: 'Submit at least one field to update user.' });
    }
    const result = await updateSupplierService(id, fieldsToUpdate)
    return res.status(200).send({
      message: 'Supplier successfully updated'
    })
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`)
  }
}
export const deleteSupplier = async (req, res) => {
  try {
    const id = req.params.id
    await deleteSupplierService(id)
    res.status(200).send({ message: "Supplier successfully deleted!" })
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`)
  }
}
export const deleteAllSuppliers = async (req, res) => {
  try {
    await deleteAllSuppliersService(
    )
    res.status(200).send({ message: 'All suppliers successfully deleted' })
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`)
  }
}