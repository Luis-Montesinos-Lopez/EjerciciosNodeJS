const { USERS_BBDD } = require('../bbdd');
const findUser =(userSession)=>{
    const user =USERS_BBDD.find(user => userSession.guid===user.guid);
    if (!user) throw new Error();
    return user;
};

module.exports = findUser;