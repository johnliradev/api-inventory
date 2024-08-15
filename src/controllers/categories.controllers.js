import { getAllCategoriesService, createCategoryService, deleteCategoryService, updateCategoryService, getCategoryByIdService, deleteAllCategoriesService } from "../services/categories.services.js"

export const getAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategoriesService()
    if (!categories.length) {
      return res.status(404).send({ message: "There are no registered categories" })
    }
    return res.status(200).send(categories)
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`)
  }
}
export const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id
    const category = await getCategoryByIdService(id)
    return res.status(200).send(category)
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`)
  }

}
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).send({ message: "Submit name field for create a category." })
    }
    const category = await createCategoryService(name)
    return res.status(201).send({
      message: "Category created!",
      insertId: category.insertId
    })
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`)
  }
}
export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id
    await deleteCategoryService(id)
    return res.status(200).send({ message: "Category successfully deleted!" })
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`)
  }
}
export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id
    const { name } = req.body
    if (!name) {
      return res.status(400).send({ message: "Submit name field for create a category." })
    }
    await updateCategoryService(id, name)
    return res.status(200).send({ message: "Category successfully updated" })
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`)
  }
}
export const deleteAllCategories = async (req, res) => {
  try {
    await deleteAllCategoriesService()
    res.status(200).send({ message: 'All categories successfully deleted' })
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`)
  }
}