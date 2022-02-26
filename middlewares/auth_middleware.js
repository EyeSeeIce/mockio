const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      throw new Error('User not authorisation')
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user_data = decodeToken
    next()
  } catch (e) {
    console.log(e.message);
    res.status(401).send({ message: 'User not authorisation' })
  }
}

module.exports = isAuth
