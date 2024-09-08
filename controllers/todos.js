import Todo from "../models/Todo.js"

const getAllTodos = async (req, res, next) => {
  try {
    const { id, username } = req.user
    const data = await Todo.find({ 'author.id': id })
    res.status(200).json({ msg: 'Success!', data })
  } catch (error) {
    next(error)
  }
}

const createTodo = async (req, res, next) => {
  try {
    const { id, username } = req.user
    const { content, completed } = req.body
    if (!content) {
      return res.status(400).json({ msg: 'Content is required' })
    }
    const todo = await Todo.create({
      author: { id, username },
      content,
      completed
    })
    res.status(200).json({ msg: 'Todo created', todo })
  } catch (error) {
    next(error)
  }
}

const getTodo = async (req, res, next) => {
  try {
    const { id, username } = req.user
    const { todoID } = req.params
    const todo = await Todo.findOne({ _id: todoID, 'author.id': id, 'author.username': username })
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found or not authorized to access this Todo' })
    }
    res.status(200).json({ msg: 'Success!', todo })
  } catch (error) {
    next(error)
  }
}

const editTodo = async (req, res, next) => {
  try {
    const { id, username } = req.user
    const { todoID } = req.params
    const { content, completed } = req.body
    if (content && content=="") {
      return res.status(400).json({ msg: 'Content is required' })
    }
    const todo = await Todo.findOneAndUpdate(
      { _id: todoID, 'author.id': id, 'author.username': username },
      { content, completed },
      { runValidators: true, new: true }
    )
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found or not authorized to edit this Todo' })
    }
    res.status(200).json({ msg: 'Todo edited', todo })
  } catch (error) {
    next(error)
  }
}

const deleteTodo = async (req, res, next) => {
  try {
    const { id, username } = req.user
    const { todoID } = req.params
    const todo = await Todo.findOneAndDelete({ _id: todoID, 'author.id': id, 'author.username': username })
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found or not authorized to edit this Todo' })
    }
    res.status(200).json({ msg: 'Todo deleted', todo })
  } catch (error) {
    next(error)
  }
}

export { getAllTodos, createTodo, getTodo, editTodo, deleteTodo }