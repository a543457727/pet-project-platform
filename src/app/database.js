const mysql = require('mysql2');
const config = require('../app/config')

const connection = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD
})

connection.getConnection((err, conn) => {
    conn.connect((err) => {
        if (err) return console.log('数据库连接异常');
        console.log('数据库连接成功');
    })
})

module.exports = connection.promise()