const express = require('express')
const router = express.Router()
module.exports = router;

const db = require('../db')

// 引入mysql模块
// const mysql = require('mysql');

// 使用连接对象方式
// let connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'h2021'
// });

// //创建连接池
// var pool  = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     port: 3306,
//     database: 'h2021',
//     multipleStatements: true
// });


router.use('/list', async function (req, res) {

    // 使用连接对象方式
    // connection.connect();
    // connection.query('select * from emp', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('The solution is: ', results);
    //     res.send(results)
    // });
    // connection.end();

    // // 使用连接池方式
    // pool.query('select * from emp', function(error, rows){
    //     console.log(rows);
    //     res.send(rows)
    // });
    const sql = 'select * from emp'
    // 回调函数调用法
    // db(sql,function(data){
    //     res.send(data)
    // })

    // pormise 用法
    // 1
    // db(sql).then(
    //     data=>{
    //         res.send(data)
    //     }
    // )

    // 2
    const data = await db(sql)
    res.send(data)

})

router.use('/:id', async function (req, res) {
    let {
        id
    } = req.params;

    // 使用连接对象方式
    // connection.connect();
    // connection.query(`select * from emp where id=${id}`, function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('The solution is: ', results);
    //     res.send(results)
    // });
    // connection.end();

    // 使用连接池方式
    // pool.query(`select * from emp where id=${id}`, function(error, rows){
    //     console.log(rows);
    //     res.send(rows)
    // });

    const sql = `select * from emp where id=${id}`
    // 回调函数调用法
    // db(sql,function(data){
    //     res.send(data)
    // })

    // pormise 用法
    // 1
    // db(sql).then(
    //     data=>{
    //         res.send(data)
    //     }
    // )

    // 2
    const data = await db(sql)
    res.send(data)

})

router.use('/cok',function(){

})
