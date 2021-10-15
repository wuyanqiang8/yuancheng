const express = require('express')
const router = express.Router()
module.exports = router;

const db = require('../db')

router.post('/', async function (req, res) {
    // console.log(req);
    const {
        username,
        password
    } = req.body;

    console.log('req.body',req.body);

    const sql = `insert into users (username,password) values('${username}','${password}')`
    const data = await db(sql)

    if (data.insertId) {
        res.send({
            code: 200,
            data: [],
            msg: 'success'
        })
    } else {
        res.send({
            code: 400,
            data: [],
            msg: 'fail'
        })
    }
})

router.get('/check', async (req, res) => {
    console.log('req.query', req.query);

    const {
        username
    } = req.query;
    const sql = `select username from users where username='${username}'`
    const data = await db(sql)

    if (data.length > 0) {
        // res.send('用户已存在')
        res.send({
            code: 400
        })
    } else {
        // res.send('可注册')
        res.send({
            code: 200
        })
    }
})