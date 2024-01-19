const userModel = require("../services/schemas/userSchema");
const findUser = async (userSession)=>{
    const user = await userModel.findById(userSession._id);
    if (!user) throw new Error();
    return user;
};

module.exports = findUser;