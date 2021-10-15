// 引入mysql模块
const mysql = require('mysql');

//创建连接池
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'h2021',
    multipleStatements: true
});

// 返回
// 回调函数写法
// // module.exports=function(sql,cbk){
// //     pool.query(sql,function(err,rows){
// //         cbk(rows)
// //     })
// // }

module.exports = function (sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}