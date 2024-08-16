import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { pool } from "../db/connection.js"
import dotenv from "dotenv"
dotenv.config()

const findUserByEmailService = async (email) => {
  const query = 'SELECT * FROM users WHERE user_email = ?'
  const [rows] = await pool.execute(query, [email])

  if (rows.length === 0) {
    return null
  }

  return rows[0]
}
export const login = async (email, password) => {
  const user = await findUserByEmailService(email)
  if (!user) {
    throw new Error('User not found')
  }
  console.log(user)
  const validPassword = await bcrypt.compare(password, user.user_password)
  if (!validPassword) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_JWT, { expiresIn: '1h' })
  return { token }
}
