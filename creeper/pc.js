const superagent = require('superagent')
const cheerio = require('cheerio')
const mysql = require('mysql')
const fs = require('fs')
const path = require('path')
const {
    log
} = require('console')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'h2021',
});



    // // 有接口网址
    // // https://v.juhe.cn/jztk/query?subject=4&model=c1&key=f3b906b6cd0ea2b924d90ad26b7a56ca&testType=order
    // // https://v.juhe.cn/jztk/query?subject=1&model=c1&key=f3b906b6cd0ea2b924d90ad26b7a56ca&testType=order

    // superagent.get('https://v.juhe.cn/jztk/query')
    //     // ?subject=1&model=c1&key=f3b906b6cd0ea2b924d90ad26b7a56ca&testType=order
    //     .query({
    //         subject: '4',
    //         model: 'a2',
    //         key: 'f3b906b6cd0ea2b924d90ad26b7a56ca',
    //         testType: 'order'
    //     })

    // .then(res => {

    //     // 有接口下载数据（对象型）

    //     // 获取对象里的数组
    //     const {
    //         result
    //     } = res.body;

    //     // console.log('result',result);

    //     // 遍历这个数组
    //     result.forEach(element => {

    //         // 数组里的每个对象张这样
    //         // {
    //         //     id: '98',
    //         //     question: '驾驶机动车在这种情况下不能超车。',
    //         //     answer: '1',
    //         //     item1: '正确',
    //         //     item2: '错误',
    //         //     item3: '',
    //         //     item4: '',
    //         //     explains: '有图可猜测前方是铁路道口，而根据《中华人民共和国道路交通安全法实施条例》规定，在铁路道口是不能超车的，因 此本题正确。',
    //         //     url: 'http://images.juheapi.com/jztk/subject4/98.jpg'
    //         //   },

    //         // 获取每个对象里的值
    //         const {
    //             id,
    //             question,
    //             answer,
    //             item1,
    //             item2,
    //             item3,
    //             item4,
    //             explains,
    //             url
    //         } = element

    //         // 更改图片名字
    //         // http://images.juheapi.com/jztk/subject4/1083.jpg
    //         // 'http://images.juheapi.com/jztk/c1c2subject1/100.jpg'
    //         // 'http://images.juheapi.com/jztk/c1c2subject1/100.jpg'
    //         // 'http://images.juheapi.com/jztk/a1b1subject1/98.jpg'

    //         const img_url = url.replace(/http:\/\/images.juheapi.com\/jztk\/subject4\//, 'kumu4_')

    //         // 写入数据库的sql
    //         let sql = `insert into kemu4( 
    //             id,
    //             question,
    //             answer,
    //             item1,
    //             item2,
    //             item3,
    //             item4,
    //             explains,
    //             img_url
    //             ) 

    //             values (
    //             '${id}',
    //             '${question}',
    //             '${answer}',
    //             '${item1}',
    //             '${item2}',
    //             '${item3}',
    //             '${item4}',
    //             '${explains}',
    //             '${img_url}'
    //             )`

    //                 // console.log('sql=',sql);

    //         // 插入数据库
    //         pool.query(sql,(err,result)=>{
    //             if(err){
    //                 console.log('err',err);
    //                 return
    //             }
    //             console.log('数据插入成功',result);
    //         })


    //         // 保持图片到本地
    //         // superagent.get(url).then(result=>{

    //         //     fs.writeFile('./src/img/a2b2_kemu1/'+img_url,result.body,function(err,res){
    //         //         if(err)
    //         //         console.log("err=",err);
    //         //         !err
    //         //         console.log("图片写入成功");
    //         //     })

    //         // })

    //     });

    // })

















    // 无接口网址

// https://www.maiche.com/rank/?from=jiakao_web
superagent.get('https://www.maiche.com/rank/')
.query({
    from: 'jiakao_web'
})


    // 无接口下载数据（html结构）

    .then(res => {


        // 把结构丢入cheerio

        const $ = cheerio.load(res.text)

        // 找到想要获取数据的结构（ul li 型），遍历它

        $('.list-content li').each((idx, el) => {
            // el就是每个li
            const $li = $(el)

            // 更改图片名
            let img_url = $li.find('img').attr('src')
            img_url = (!img_url.startsWith('https') ? 'https' : '') + img_url
            const {
                pathname
            } = new URL(img_url)
            const filename = path.basename(pathname).replace(/!315x210/g, '')

            // 提取想要的数据
            const goods = {
                id: $li.find('.n').text(),
                img_url: filename,
                name: $li.find('h3').text(),
                price: $li.find('strong').text(),
                zhibao: $li.find('.zb .fl:nth-of-type(1) span:nth-of-type(1)').text(),
                huanbao: $li.find('.zb .fl:nth-of-type(1) span:nth-of-type(2)').text(),
                youhao: $li.find('.zb .fl:nth-of-type(2) span:nth-of-type(1)').text(),
                ranyoubiaohao: $li.find('.zb .fl:nth-of-type(2) span:nth-of-type(2)').text(),
                quanguoxiaoliang: $li.find('.item-num').text()
            }

            // console.log('goods=',goods);

            // 生成一个数组
            const goodslist = []
            goodslist.push(goods)
            // console.log('goodslist=', goodslist);

            // 把图片保持到本地
            // superagent.get(img_url).then(result => {
            //     // console.log(result);
            //     fs.writeFile('./src/img/chepaihang/' + filename, result.body, function (err, res) {
            //         if (err)
            //             console.log('err=', err);
            //         else
            //             console.log('图片写入成功！');
            //     })
            // })
            // li遍历结尾

            // 写入数据库的sql

            let sql = `insert into chepaihang(id,img_url,name,price,zhibao,huanbao,youhao,ranyoubiaohao,quanguoxiaoliang) values`

            sql += goodslist.map(item => {
                const {
                    id,
                    img_url,
                    name,
                    price,
                    zhibao,
                    huanbao,
                    youhao,
                    ranyoubiaohao,
                    quanguoxiaoliang
                } = item;
                return `('${id}','${img_url}','${name}','${price}','${zhibao}','${huanbao}','${youhao}','${ranyoubiaohao}','${quanguoxiaoliang}')`
            }).join(',')

            // 把数据写入数据库
            // console.log('sql=', sql);
            pool.query(sql, (err, result) => {
                if (err) {
                    console.log('err=', err);
                    return
                }
                console.log('数据写入成功', result);
            })

        })
    })