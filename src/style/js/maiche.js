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
    
    })