import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
  const authHeader = req.readers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).send({ message: 'Acess denied, no token provided' })
  }
}
