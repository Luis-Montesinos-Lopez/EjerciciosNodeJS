const db = require("../MySQLConnection");
const moment = require('moment');

let productsQuerys = {};

productsQuerys.getPathById = async (id) => {
    conn = null;
    try {
        conn = await db.createConnection();
        return await db.query('SELECT path FROM images WHERE id = ?', [id], 'select', conn);
    } catch (e) {
        throw new Error (e.message)
    }finally{
        conn && await conn.end();
    }
}
productsQuerys.addProductImage = async (imageData) => {
    conn = null;
    try {
        conn = await db.createConnection();
        let imageObject = {
            name: imageData.name,
            path:imageData.path,
            registerDate:moment().format('YYYY-MM-DD HH:mm:ss')
        };
        return await db.query('INSERT INTO images SET ?', imageObject, 'insert', conn);
    } catch (e) {
        throw new Error (e.message)
    }finally{
        conn && await conn.end();
    }
}

module.exports= productsQuerys;