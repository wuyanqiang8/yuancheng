const superagent = require('superagent')
const cheerio = require('cheerio')
const mysql = require('mysql')
const fs = require('fs')
const path = require('path')
const { log } = require('console')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'h2021',
});

superagent.get('https://www.maiche.com/rank/')
    .query({
        from: 'jiakao_web'
    })
    .then(res => {
        // console.log(res.text);

        const $ = cheerio.load(res.text)

        const goodslist = []

        $('.list-content li').each((idx, el) => {
            const $li = $(el)

            let img_url=$li.find('img').attr('src')

            img_url=(!img_url.startsWith('https')?'https':'')+img_url

            const {pathname}=new URL(img_url)
            const filename=path.basename(pathname).replace(/!315x210/g,'')

            const goods = {
                img_url: filename,
                name: $li.find('h3').text(),
                price: $li.find('strong').text(),
                zhibao: $li.find('.el:nth-of-type(1)').text(),
                huanbiao: $li.find('.el:nth-of-type(2)').text(),
                youhao: $li.find('.fl:nth-of-type(1)').text(),
                ranyoubiaohao: $li.find('.fl:nth-of-type(2)').text(),
                quanguoxiaoliang: $li.find('.item-num').text()
            }

            // goodslist.push(goods)

            superagent.get(img_url).then(result=>{
                // console.log(result);
                fs.writeFile('./src/img/chepaihang/'+filename,result.body,function(err,res){
                    if(err)
                    console.log('err=',err);
                    else
                    console.log('图片写入成功！');
                })
            })
        })

        //    console.log('goodslist=',goodslist);

        let sql = `insert into chepaihang2(img_url,name,price,zhibao,huanbao,youhao,ranyoubiaohao,quanguoxiaoliang) values`

        sql += goodslist.map(item => {
            const {
                img_url,
                name,
                price,
                zhibao,
                huanbao,
                youhao,
                ranyoubiaohao,
                quanguoxiaoliang
            } = item;
            return `('${img_url}','${name}','${price}','${zhibao}','${huanbao}','${youhao}','${ranyoubiaohao}','${quanguoxiaoliang}')`
        }).join(',')

        // console.log('sql=', sql);
        // pool.query(sql, (err, result) => {
        //     if (err) {
        //         console.log('err=', err);
        //         return
        //     }
        //     console.log('数据写入成功', result);
        // })

    })