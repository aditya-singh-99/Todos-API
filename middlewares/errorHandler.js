
const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ msg: 'Something broke!' })
}

export default errorHandler