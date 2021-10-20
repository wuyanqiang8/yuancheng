jQuery($ => {
    const $username = $('#username')
    const $password = $('#password')
    const $btnSubmit = $('.btnSubmit')

    let isVelid=true;
    $username.on('change', function () {

        $.ajax({
            url: '/reg/check',
            data: {
                username: $username.val()
            }
        }).then(res => {
            // console.log(res);
            if (res.code === 400) {
                // alert('用户名已存在')
                $username.addClass('is-invalid')
                isVelid=false
                
            } else {
                // alert('可注册')
                $username.removeClass('is-invalid')
                $username.addClass('is-valid')
                isVelid=true
            }

        })
    })
    
    $btnSubmit.on('click',function(){
        if(!isVelid){
            return
        }
        $.ajax({
            type:'post',
            // method:'post',
            url:'/reg',
            data:{
                username:$username.val(),
                password:$password.val()
            }
        }).then(res=>{
            console.log(res);

        })

    })
})