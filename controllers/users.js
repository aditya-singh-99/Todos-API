import User from "../models/User.js"
import jsonwebtoken from "jsonwebtoken"
const jwt = jsonwebtoken

const login = async (req, res, next) => {
  try {
    console.log(req.body)
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ msg: 'Please enter a username and password' })
    }
    const user = await User.find({ username: username })
    if (user.length > 0) {
      if (user[0].password !== password)
        res.status(401).json({ msg: 'Wrong password' })
      else {
        const payload = {
          username: user[0].username,
          id: user[0]._id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).json({ token, id: user[0]._id, msg: 'Successfull!' })
      }
    } else {
      const user = await User.create({
        username: username,
        password: password
      })
      const payload = {
        username: user.username,
        id: user._id
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
      res.status(200).json({ token, id: user._id, msg: 'User Created!' })
    }
  } catch (error) {
    next(error)
  }
}

export { login }