jQuery($=>{
    $.ajaxSetup({
        beforeSend(xhr){
            this.url='http://localhost:8888/api'+this.url;
        }
    })
})
