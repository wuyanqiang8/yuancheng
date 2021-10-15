const express=require('express')
const router=express.Router()
module.exports=router;

const goodsRouter=require('./goods')
const userRouter=require('./user')
const regRouter=require('./reg');
const loginRouter=require('./login')

const { json } = require('express');

router.use(
    express.urlencoded({extended:false}),
    express.json()
)

router.use('/goods',goodsRouter)
router.use('/user',userRouter)
router.use('/reg',regRouter)
router.use('/login',loginRouter)

