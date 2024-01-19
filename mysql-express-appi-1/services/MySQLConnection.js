const mysql = require('mysql2');
let db = {};

db.createConnection = async () => {
    return new Promise((resolve, reject) => {
        try {
            const mysqlconnection = mysql.createConnection({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                dateStrings: true
            })
            mysqlconnection.connect(async (err) => {
                if (err) {
                reject (new Error(err.message))
                }
                resolve(mysqlconnection)
            });
        } catch (err) {
            reject (new Error(err.message))
        }
    })
}
db.query = async (sqlQuery, params, type, conn) => {
    return new Promise((resolve, reject) => {
        try {
            conn.query(sqlQuery, params, async(err, result) => {
                if(!err){
                    switch (type){
                        case 'select':
                            resolve(JSON.parse(JSON.stringify(result)))
                            break
                        case 'insert':
                            resolve(parseInt(result.insertId))
                            break
                        case 'update':
                        case 'replace':
                        case 'delete':
                            resolve(true)
                            break
                        default:
                            throw new Error('Query type not match')
                    }
                }else{
                    console.log('Query or database error: ', err)
                    reject(new Error(err.message))
                }
            })
        } catch (error) {
            reject(new Error(error.message))
        }
    })
}
module.exports = db;

