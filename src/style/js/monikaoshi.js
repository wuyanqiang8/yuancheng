jQuery($ => {
    // 登录注册
    const dlzc = $('.dlzc')
    const yonghutuichu = $('.yonghutuichu')

    const yonghuname = $('.yonghuname')
    const tuichu = $('.tuichu')

    yonghutuichu.hide()
    dlzc.show()

    const cookie = document.cookie
    const arr = cookie.split('; ')

    const data = {}
    arr.forEach(item => {
        const [key, value] = item.split('=')
        data[key] = value;
    })

    if (data.username && data.password) {
        yonghutuichu.show()
        dlzc.hide()
        yonghuname.text(data.username)
    }

    let date = new Date()
    date.setDate(date.getDate() - 1)

    tuichu.on('click', e => {
        document.cookie = `username=x;expires=` + date;
        document.cookie = `password=x;expires=` + date;
        location.reload()
    })

    // 链接
    // tab切换
    const tabs = $('.lianjie>.tab>div')
    const nerrong = $('.lianjie>.neirong>div')
    tabs.first().addClass('active')
    nerrong.not(':first').hide();

    tabs.on('mouseover', function () {
        const currentTndex = $(this).index()

        $(this).addClass('active')
        $(this).siblings().removeClass('active')

        nerrong.eq(currentTndex).show()
        nerrong.eq(currentTndex).siblings().hide()
    })

    // 随机链接
    const neirongs = $('.neirong>div')
    let xxx = 0;
    for (let j = 0; j < 5; j++) {

        let aaa = Math.random();
        let as = ``;
        for (let i = 0; i < 50 * aaa; i++) {
            xxx++;
            as = as + `<a href="#">连接${xxx}</a>`
        }
        neirongs.eq(j).html(as)
    }




    // 题序
    const tixu = $('.tixu')

    let tixus20 = '';
    let tixuzong = '';
    let shu = 0;
    for (let i = 1; i <= 20; i++) {

        let tixus5 = ``;
        for (let j = 1; j <= 5; j++) {
            shu++;

            tixus5 = tixus5 + `<p class="tabp">${shu}</p>`
        }

        tixus20 = `<div>${tixus5}</div>`;
        tixuzong = tixuzong + tixus20;
    }

    tixu.html(tixuzong)



    // 渲染页面
    $.ajax({
        url: '/kaoshi',
    }).then(res => {
        // console.log('res=',res);

        let imgs = ''
        let tis = ''
        let tiid = 0;

        res.forEach(e => {

            tiid++;
            // console.log('tiid=',tiid);
            // console.log('e=',e);

            // answer: "3"
            // explains: "由图可知，前方是向右环形路段，因此向右行驶时不需要开启转向灯，所以本题选C。"
            // id: "1"
            // img_url: "kumu4_1.jpg"
            // item1: "开启右转向灯"
            // item2: "开启危险报警闪光灯"
            // item3: "不用开启转向灯"
            // item4: "开启左转向灯"
            // question: "驾驶机动车进入这个路口怎样使用灯光？"

            // 拿数据：

            // 图片
            const {
                id,
                img_url,

                // 题目答案
                question,
                item1,
                item2,
                item3,
                item4,
                answer,
                explains
            } = e;


            // 图片
            if (img_url) {
                imgs = imgs + `<img src="../img/kemu4/${img_url}" id="kemu${id}" style="width: 330px;height: 200px;">`
            }

            // 题目类型
            let tixing = '单选题'
            if (!item3 && !item4) {
                tixing = '判断题'
            }
            if (answer >= 5) {
                tixing = '多选题'
            }

            // 答案加上abcd
            let tia = ''
            if (item1) {
                tia = 'A、'
            }
            let tib = ''
            if (item2) {
                tib = 'B、'
            }
            let tic = ''
            if (item3) {
                tic = 'C、'
            }
            let tid = ''
            if (item4) {
                tid = 'D、'
            }

            // 答案类型转换 123>abc
            let daan = ''
            if (answer == 1) {
                daan = "A"
            }
            if (answer == 2) {
                daan = "B"
            }
            if (answer == 3) {
                daan = "C"
            }
            if (answer == 4) {
                daan = "D"
            }
            if (answer == 7) {
                daan = "AB"
            }
            if (answer == 8) {
                daan = "AC"
            }
            if (answer == 9) {
                daan = "AD"
            }
            if (answer == 10) {
                daan = "BC"
            }
            if (answer == 11) {
                daan = "BD"
            }
            if (answer == 12) {
                daan = "CD"
            }
            if (answer == 13) {
                daan = "ABC"
            }
            if (answer == 14) {
                daan = "ABD"
            }
            if (answer == 15) {
                daan = "ACD"
            }
            if (answer == 16) {
                daan = "BCD"
            }
            if (answer == 17) {
                daan = "ABCD"
            }


            let daananniu = ''
            if (item1 && item2) {
                daananniu = `
                    <div>A</div>
                    <div>B</div>
                    `
            }

            if (item3 && item4) {
                daananniu = `
                    <div>A</div>
                    <div>B</div>
                    <div>C</div>
                    <div>D</div>
                    `
            }


            // 每个题目
            tis = tis + `
                <div class="tis">
                <div>
                <h4>【${tixing}】</h4>
                <h4>第${tiid}题：${question}</h4>
                <h4>${tia}${item1}</h4>
                <h4>${tib}${item2}</h4>
                <h4>${tic}${item3}</h4>
                <h4>${tid}${item4}</h4>
                </div>
                
                <div>
                <h4>答案为：${daan}</h4>
                <h4>提示：${explains}</h4>
                </div>

                <div class="daananniu">
                ${daananniu}
                </div>

                </div>
                `



        })

        // 把图片渲染到页面

        // console.log('imgs=',imgs);
        const tu = $('.tu')
        tu.html(imgs)

        const $imgs = $('.tu>img')
        $imgs.eq(1).show()
        $imgs.eq(1).siblings().hide()

        // 把题目渲染到页面
        const ti = $('.ti')
        ti.html(tis)

        const $tis = $('.ti>div')
        $tis.eq(0).show()
        $tis.eq(0).siblings().hide()












        // 完成题目的tab切换
        const $tixu = $('.tabp')
        // console.log('$tixu=',$tixu);



        $tixu.on('click', function () {

            const currentTndex = $(this).text() - 1 * 1
            // const currentTndex=$(this).index()
            // console.log(' $(this)=', $(this));
            // console.log(currentTndex);

            // $(this).siblings().removeClass('activetab')
            // $(this).addClass('activetab')



            $imgs.eq(currentTndex).show()
            $imgs.eq(currentTndex).siblings().hide()

            $tis.eq(currentTndex).show()
            $tis.eq(currentTndex).siblings().hide()
        })












































    })




















})