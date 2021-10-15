const express = require('express')
const  db=require('../db')

const router = express.Router();
module.exports = router;

router.post('/', async (req, res) => {
    // console.log(req.body);
    const {
        username,
        password,
    } = req.body;
    console.log(username);
    console.log(password);
    const sql = `select username from users where username='${username}'and password='${password}'`
    // console.log(spl);
    const data = await db(sql)

    if (data.length>0) {
        res.send({
            code: 200,
            data:data[0],
            message:'seccess'
        })
    } else {
        res.send({
            code: 400,
            data:[],
            message:'fail'
        })
    }
})
