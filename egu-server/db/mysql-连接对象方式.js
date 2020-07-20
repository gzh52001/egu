// 导入mysql模块
const mysql = require('mysql');

// 创建连接
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "benlai"
})

// 连接数据库
connection.connect(); 

// 查询语句
let sql = "SELECT * FROM `categorymenu1`";

// 执行查询语句
connection.query(sql, (error, results, fields) => {
    console.log(results);
})  

// 关闭连接
connection.end();