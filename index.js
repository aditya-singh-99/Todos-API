import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './db/connect.js'
import usersRouter from './routes/users.js'
import todosRouter from './routes/todos.js'
import routeNotFound from './middlewares/routeNotFound.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//app.use(cors())

app.use('/users',usersRouter)
app.use('/todos', todosRouter)

app.use(routeNotFound)
app.use(errorHandler)

const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(port, () => console.log(`Server is listening on Port: ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()