import { pool } from "../db/connection.js";
import { getCategoryByIdService } from "../services/categories.services.js";
import { getProductByIdService } from "../services/products.sevices.js";
import { getSupplierByIdService } from "../services/suppliers.services.js";
import { getTransactionByIdService } from "../services/transactions.services.js";
import { getUserByIdService } from "../services/users.services.js";

export const validateEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).send({ message: "Submit email field to continue" });
    }
    const [existEmail] = await pool.execute('SELECT * FROM users WHERE user_email = ?', [email]);
    if (existEmail.length > 0) {
      return res.status(400).send({ message: "This email already in use" });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
};
export const validateCategoryParams = async (req, res, next) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.status(400).send({ message: "Category ID not provided." });
    }
    const category = await getCategoryByIdService(id);
    if (!category.length) {
      return res.status(404).send({ message: "Category not found, check your ID." });
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
};
export const validateUserParams = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "User ID not provided." });
    }
    const user = await getUserByIdService(id);
    if (!user.length) {
      return res.status(404).send({ message: "User not found, check your id." });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
};
export const validateSupplierParams = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Supplier ID not provided." });
    }
    const supplier = await getSupplierByIdService(id);
    if (!supplier.length) {
      return res.status(404).send({ message: "Supplier not found, check your ID." });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
};
export const validateProductParams = async (req, res, next) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.status(400).send({ message: "Product ID not provided." });
    }
    const product = await getProductByIdService(id);
    if (!product.length) {
      return res.status(404).send({ message: "Product not found, check your ID." });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: `Server  error: ${error.message}` });
  }
}
export const validateTransactionParams = async (req, res, next) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.status(400).send({ message: "Transaction ID not provided." });
    }
    const transaction = await getTransactionByIdService(id);
    if (!transaction.length) {
      return res.status(404).send({ message: "Transaction not found, check your ID." });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: `Server  error: ${error.message}` });
  }
}
export const validateSupplierBody = async (req, res, next) => {
  try {
    const id = req.body.supplierId;
    if (!id) {
      return res.status(400).send({ message: "Supplier ID not provided." });
    }
    const supplier = await getSupplierByIdService(id);
    if (!supplier.length) {
      return res.status(404).send({ message: "Supplier not found, check your ID." });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
}
export const validateCategoryBody = async (req, res, next) => {
  try {
    const id = req.body.categoryId;
    if (!id) {
      return res.status(400).send({ message: "Category ID not provided." });
    }
    const category = await getSupplierByIdService(id);
    if (!category.length) {
      return res.status(404).send({ message: "Category not found, check your ID." });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
}
export const validateUserBody = async (req, res, next) => {
  try {
    const id = req.body.userId;
    if (!id) {
      return res.status(400).send({ message: "User ID not provided." });
    }
    const user = await getUserByIdService(id);
    if (!user.length) {
      return res.status(404).send({ message: "User not found, check your ID." });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
}
export const validateProductBody = async (req, res, next) => {
  try {
    const id = req.body.productId;
    if (!id) {
      return res.status(400).send({ message: "Product ID not provided." });
    }
    const product = await getProductByIdService(id);
    if (!product.length) {
      return res.status(404).send({ message: "Product not found, check your ID." });
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
}
export const validateSupplierIfPresent = async (req, res, next) => {
  try {
    const id = req.body.supplierId;
    if (id) {
      const supplier = await getSupplierByIdService(id);
      if (!supplier.length) {
        return res.status(404).send({ message: "Supplier not found, check your ID." });
      }
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
};
export const validateCategoryIfPresent = async (req, res, next) => {
  try {
    const id = req.body.categoryId;

    if (id) {
      const category = await getCategoryByIdService(id);
      if (!category.length) {
        return res.status(404).send({ message: "Category not found, check your ID." });
      }
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
};
export const validateUserIfPresent = async (req, res, next) => {
  try {
    const id = req.body.userId;
    if (id) {
      const user = await getUserByIdService(id);
      if (!user.length) {
        return res.status(404).send({ message: "User not found, check your ID." });
      }
    }
    next();
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
};
export const validateProductIfPresent = async (req, res, next) => {
  try {
    const id = req.body.productId;
    if (id) {
      const product = await getProductByIdService(id);
      if (!product.length) {
        return res.status(404).send({ message: "Product not found, check your ID." });
      }
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
};