function request(options={}){
    let{url,method='get',data}=options;

    const baseUrl='http://localhost:2021/api'

    url=baseUrl+url;

    let params=null;

    if(data){
        const arr=[]

        for(let key in data){
            arr.push(`${key}=${data[key]}`);

        }
        params=arr.join('&')
        if(method==='get'){
            url=url+'?'+params;
            params=null;
        }
    }

    const promise =new Promise(function(resolve,reject){
        const xhr=new XMLHttpRequest();
        xhr.onload =function(){
            let data =JSON.parse(xhr.responseText);
            resolve(data)
        }
        xhr.open(method,url,true);
        
        if(['post','put'].includes(method)){
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencode')
        }
        xhr.send();
    })
    return promise;
}