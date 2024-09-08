import jsonwebtoken from "jsonwebtoken"
const jwt = jsonwebtoken

const tokenVerification = async (req, res, next) => {
  const authToken = req.headers.authorization
  if (!authToken || !authToken.startsWith('Bearer')) {
    return res.status(403).json({ msg: 'No token found' })
  }
  const token = authToken.split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
  } catch (error) {
    return res.status(401).json({ msg: 'Invalid Token' })
  }
  next()
}

export default tokenVerification