const mysql = require('mysql');

// 创建连接池
// 默认创建10个连接对象，使用完自动放回连接池，无需手动关闭。
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "123456",
    port: 3306,
    database: 'benlai',
    multipleStatements: true
});

// 封装执行查询语句的方法
function query(sql){
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, data) => {
            if(err) reject(err); // reject后后面的代码不会再执行
            resolve(data);
        });
    });
}

module.exports = query;