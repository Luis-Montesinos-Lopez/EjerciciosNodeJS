const { USERS_BBDD } = require('../bbdd')
const checkEmailPassword = async (email, password) => {
  const user = USERS_BBDD.find(user => user.email === email)
  if (!user) throw new Error()
  if (user.password !== password) throw new Error()
  return user
}
module.exports = checkEmailPassword
