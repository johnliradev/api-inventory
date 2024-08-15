import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
  deleteAllProductsService
} from '../services/products.sevices.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductByIdService(id);
    res.status(200).send(product);
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
}
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, categoryId, supplierId } = req.body;
    const result = await createProductService(name, description, price, quantity, categoryId, supplierId);
    res.status(201).send({ message: 'Product created successfully', productId: result.insertId });
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const fieldsToUpdate = req.body;
    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).send({ message: 'Submit at least one field to update user.' });
    }
    const result = await updateProductService(id, fieldsToUpdate);
    res.status(200).send({ message: 'Product updated successfully' });
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductService(id);
    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const deleteAllProducts = async (req, res) => {
  try {
    await deleteAllProductsService();
    res.status(200).send({ message: 'All products deleted successfully' });
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
