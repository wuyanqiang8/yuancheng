const express =require('express')
const app=express()
const router=require('./router')

app.use(express.static('../src'))

app.use('/api',router)

app.listen(2021,function(){
    console.log('hello server!');
})
