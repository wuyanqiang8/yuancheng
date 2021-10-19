jQuery($ => {
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

    const zonghe = $('.zonghe>ul')
    const koubei = $('.koubei>ul')
    const jianlian = $('.jianlian>ul')
    let lis = ``;
    for (let i = 1; i < 11; i++) {
        lis = lis + `<li><span><a href="#">${i}.xxx驾校</a></span> <span style="color: orange;">xxx人</span></li>`
    }
    zonghe.html(lis)
    koubei.html(lis)
    jianlian.html(lis)

    const lc = $('.lc>li')
    console.log(lc);
    let lcs = ``;
    for (let j = 0; j < 6; j++) {

        lcs = `<a href="#">
        <div class="lct">
        <img src="img/else/liucheng${j+1}.png" alt="">
        <img src="img/else/liucheng${(j+1)+(j+1)*10}.png" alt="">
        </div>
        <h3>流程${j+1}</h3>
        </a>`
        lc.eq(j).html(lcs)
    }




})