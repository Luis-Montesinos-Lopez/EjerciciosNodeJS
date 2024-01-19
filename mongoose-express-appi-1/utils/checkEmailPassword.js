const userModel = require("../services/schemas/userSchema")
const checkEmailPassword = async (email, password) => {
 const user = await userModel.findOne({email})
 console.log(user)
  if (!user) throw new Error()
  if (user.password !== password) throw new Error()
  return user
}
module.exports = checkEmailPassword
