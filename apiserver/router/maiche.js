const express = require('express')
const  db=require('../db')

const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {

    const sql = `select * from chepaihang`

    const data = await db(sql)

    res.send(data)

})
