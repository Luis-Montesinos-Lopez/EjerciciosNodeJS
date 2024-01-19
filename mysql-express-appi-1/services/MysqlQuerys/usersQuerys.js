const db = require("../MySQLConnection");
const moment = require('moment');
const md5 = require('md5');
const removeUndefinedKeys = require("../../utils/removeUndefinedKeys");

let userQuerys = {};
userQuerys.getUsers = async () => {
    conn = null;
    try {
        conn = await db.createConnection();
        return await db.query('SELECT * FROM users join usersacces on users.userAccesId=usersacces.id',null, 'select', conn);
    } catch (e) {
       throw new Error(e.message) 
    }finally{
        conn && await conn.end();
    };
}
userQuerys.getUserById = async (id) => {
    let conn = null
    try {
        conn = await db.createConnection();
        return await db.query('SELECT * FROM usersacces join users on users.userAccesId=usersacces.id WHERE users.id=?', id,'select', conn)
    } catch (e) {
        throw new Error(e)        
    }finally{
        conn && await conn.end();
    };
};
userQuerys.getUserByEmail = async (email) => {
    let conn = null
    try {
        conn = await db.createConnection();
        return await db.query('SELECT * FROM usersacces join users on users.userAccesId=usersacces.id WHERE email=?', email,'select', conn)
    } catch (e) {
        throw new Error(e)        
    }finally{
        conn && await conn.end();
    };
};
userQuerys.addUserAcces = async (userAccesData) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        let userObject = {
            email:userAccesData.email,
            password:md5(userAccesData.password),            
        }
        return await db.query('INSERT INTO usersacces SET ?', userObject, 'insert', conn)
    } catch (e) {
        throw new Error(e)
    }finally{
        conn && await conn.end
    }
};
userQuerys.addUser = async (userData) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        let userObject = {
            name: userData.name,
            surname: userData.surname,
            userAccesId: userData.userAccesId,
            registerDate:moment().format('YYYY-MM-DD HH:mm:ss')
        }
        return await db.query('INSERT INTO users SET ?', userObject, 'insert', conn)
    } catch (e) {
        throw new Error(e)
    }finally{
        conn && await conn.end();
    };
};
userQuerys.updateUserAcces = async (accesId, userAccesData) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        let userObject = {
            email:userAccesData.email,
            password:userAccesData.password ? md5(userAccesData.password) : undefined,            
        }
        userObject = await removeUndefinedKeys(userObject);
        return await db.query('UPDATE usersacces SET ? WHERE id = ?', [userObject, accesId], 'update', conn);        
    } catch (e) {
        throw new Error(e)
    }finally{
        conn && await conn.end();
    }
}
userQuerys.updateUser = async (id, userData) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        let userObject = {
            name: userData.name,
            surname: userData.surname,
            userAccesId: userData.userAccesId,
            updateDate:moment().format('YYYY-MM-DD HH:mm:ss')
        };
        userObject = await removeUndefinedKeys(userObject);
        return await db.query('UPDATE users SET ? WHERE id = ?', [userObject, id], 'update', conn);        
    } catch (e) {
        throw new Error(e)
    }finally{
        conn && await conn.end();
    }
};
userQuerys.deleteUser = async (id) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        return await db.query('DELETE FROM users WHERE id = ?', id, 'delete', conn)
    } catch (e) {
        throw new Error(e)
    }finally{
        conn && await conn.end();
    };
};
userQuerys.deleteUserAcces = async (accesId) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        return await db.query('DELETE FROM usersacces WHERE id = ?', accesId, 'delete', conn)
    } catch (e) {
        throw new Error(e)
    }finally{
        conn && await conn.end();
    };
};

module.exports = userQuerys;