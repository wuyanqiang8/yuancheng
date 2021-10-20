jQuery($=>{

    const  $username=$('#username')
      const $password=$('#password')
      const $btn=$('.btn')

      $btn.on('click',function(){
          $.ajax({
              type:'post',
              url:'/login',
              data:{
                  username:$username.val(),
                  password:$password.val(),
              }
          }).then(res=>{
              console.log(res);
              if(res.code===200){
                //   登录成功
                document.cookie=`username=${$username.val()}`
                document.cookie=`password=${$password.val()}`
                location.href='./'
              }else{
                //   登录失败
                  $username.addClass('is-invalid')
              }
          })
      })

      
  })