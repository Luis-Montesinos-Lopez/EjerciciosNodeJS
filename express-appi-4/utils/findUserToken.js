const { USERS_BBDD } = require('../bbdd');
const findUserToken =(payload)=>{
    const user =USERS_BBDD.find(user => user.guid===payload.guid);
    if (!user) throw new Error();
    return user;
};

module.exports = findUserToken;