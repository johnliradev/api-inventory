import express from 'express'
import { login } from '../services/auth.services.js'

export const authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token } = await login(email, password)
    res.json({
      token
    })
  } catch (err) {
    res.status(400).send({ message: err.message })

  }
})
