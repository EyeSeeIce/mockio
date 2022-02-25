const bcrypt = require('bcrypt')

const validatePassword = async (password, bdPassword) => {
  return await bcrypt.compare(password, bdPassword)
}

module.exports = validatePassword