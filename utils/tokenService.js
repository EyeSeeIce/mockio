const jwt = require('jsonwebtoken')

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRES_ACCESS_TOKEN,
  })
}

const generateApiToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_API_KEY, {
    expiresIn: process.env.EXPIRES_API_TOKEN,
  })
}


module.exports = {
  generateAccessToken,
  generateApiToken
}
