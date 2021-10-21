const express=require('express')
const router=express.Router()
module.exports=router;

const goodsRouter=require('./goods')
const userRouter=require('./user')
const regRouter=require('./reg');
const loginRouter=require('./login')
const maicheRouter=require('./maiche')

const { json } = require('express');

router.use(
    express.urlencoded({extended:false}),
    express.json()
)


router.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    next();
})



router.use('/goods',goodsRouter)
router.use('/user',userRouter)
router.use('/reg',regRouter)
router.use('/login',loginRouter)
router.use('/maiche',maicheRouter)

