jQuery($ => {
// 登录注册
    const dlzc=$('.dlzc')
    const yonghutuichu=$('.yonghutuichu')
    
    const yonghuname=$('.yonghuname')
    const tuichu=$('.tuichu')
    
    yonghutuichu.hide()
    dlzc.show()
    
    const cookie=document.cookie
    const arr = cookie.split('; ')
    
    const data={}
    arr.forEach(item=>{
        const [key,value]=item.split('=')
        data[key]=value;
    })
    
    if(data.username&&data.password){
        yonghutuichu.show()
        dlzc.hide()
        yonghuname.text(data.username)
    }
    
    let date=new Date()
    date.setDate(date.getDate()-1)
    
    tuichu.on('click',e=>{
        document.cookie=`username=x;expires=`+date;
        document.cookie=`password=x;expires=`+date;
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
    



        $.ajax({
            url:'/maiche',
        }).then(res=>{
            // console.log('res=',res);

                // console.log(e);

                // huanbao: "环保标准：国VI，国IV，国IV(国V)，国V，欧V"
                // id: "1"
                // img_url: "bf081c39f34348f3adce0798364bdfca.jpg"
                // name: "英朗"
                // price: "11.99-14.49万"
                // quanguoxiaoliang: "37739"
                // ranyoubiaohao: "燃油标号：92号"
                // youhao: "油耗：5.9 - 6.9L"
                // zhibao: "质保：三年或10万公里，两年或6万公里"
                
                const html=res.map(item=>{
                    return `<li>
                        <p>
                        <span>${item.id}</span>
                        <img src="../img/chepaihang/${item.img_url}" style="width: 180px;height: 120px;">
                        </p>

                        <p>
                        <span>${item.name}</span>
                        <span>厂商指导价：${item.price}</span>
                        <span>全国销量：${item.quanguoxiaoliang}</span>
                        </p>

                        <p>
                        <span>${item.zhibao}</span>
                        <span>${item.huanbao}</span>
                        <span>${item.youhao}</span>
                        <span>${item.ranyoubiaohao}</span>
                        </p>
                       
                        <p>
                        <a href="#">立即购买</a>
                        </p>
                        </li>`
                }).join('')

                $('.che').html(html)

        })






























    })