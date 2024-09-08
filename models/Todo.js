import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  content: {
    type: String,
    required: true,
    maxlength: 50
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Todo = mongoose.model('Todo', todoSchema)
export default Todo