import express from 'express'
import { login } from '../controllers/users.js'

const usersRouter = express.Router()

usersRouter.post('/', login)

export default usersRouter