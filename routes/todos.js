import express from 'express'
import { createTodo, deleteTodo, editTodo, getAllTodos, getTodo } from '../controllers/todos.js'
import tokenVerification from '../middlewares/tokenVerification.js'

const todosRouter = express.Router()

todosRouter.use(tokenVerification)
todosRouter.get('/', getAllTodos)
todosRouter.post('/', createTodo)
todosRouter.get('/:todoID', getTodo)
todosRouter.put('/:todoID', editTodo)
todosRouter.delete('/:todoID', deleteTodo)

export default todosRouter

get('todos/', getAllTodos)
post('todos/', createTodo)
get('todos/:todoID', getTodo)
put('todos/:todoID', editTodo)
delete('todos/:todoID', deleteTodo)