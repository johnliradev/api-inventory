import express from "express"
import { checkDatabaseConnection } from "./db/connection.js"
import { productsRouter } from "./routes/products.routes.js"
import { usersRouter } from "./routes/users.routes.js"
import { suppliersRouter } from "./routes/suppliers.routes.js"
import { categoriesRouter } from "./routes/categories.routes.js"
import { swaggerRouter } from "./routes/swagger.route.js"
import { transactionsRouter } from "./routes/transactions.routes.js"
import { authRouter } from "./routes/auth.routes.js"
const app = express()
const port = 3333


app.use(express.json())
app.use(authRouter)
app.use(productsRouter)
app.use(transactionsRouter)
app.use(usersRouter)
app.use(suppliersRouter)
app.use(categoriesRouter)
app.use(swaggerRouter)
app.get('/', (req, res) => res.send({ message: "Inital Page" }))
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})

checkDatabaseConnection()
