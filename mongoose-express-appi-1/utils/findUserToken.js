const userModel = require("../services/schemas/userSchema");

const findUserToken = async (payload)=>{
    const user =  await userModel.findById(payload._id);
    if (!user) throw new Error();
    return user
};

module.exports = findUserToken;