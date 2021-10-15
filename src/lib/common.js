jQuery($=>{
    $.ajaxSetup({
        beforeSend(xhr){
            this.url='http://localhost:2021/api'+this.url;
        }
    })
})
