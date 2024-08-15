import {
  createUserService,
  deleteAllUsersService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService
} from "../services/users.services.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    if (!users.length) {
      return res.status(404).send({ message: "There are no registered users" });
    }
    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserByIdService(id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).send({ message: "Submit all fields to create user." });
    }
    const user = await createUserService(name, email, password, role);
    console.log(user.insertId);
    return res.status(201).send({
      message: "User successfully created",
      insertId: user.insertId
    });
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const fieldsToUpdate = req.body;
    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).send({ message: 'Submit at least one field to update user.' });
    }
    await updateUserService(id, fieldsToUpdate);
    return res.status(200).send({ message: 'User successfully updated' });
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteUserService(id);
    return res.status(200).send({ message: "User successfully deleted!" });
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};
export const deleteAllUsers = async (req, res) => {
  try {
    await deleteAllUsersService();
    return res.status(200).send({ message: 'All users successfully deleted' });
  } catch (error) {
    return res.status(500).send(`Server error: ${error}`);
  }
};