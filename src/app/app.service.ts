import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Http,ResponseContentType } from "@angular/http";

@Injectable()

export class AppService{
    
    constructor(
        public http:HttpClient,
        public http2:Http
    ){}
    
    loginUser(user:User){
        let cpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest' });
        
        return this.http.post(`http://api.paytek-africa.com/api/users`,user,{ headers: cpHeaders }).
        toPromise().then((response)=>{console.log('Gravado com Sucesso')})
        .catch((err)=>{console.log(err.status)}) 
        // console.log(user)
    }

    downloadFile(){
        return this.http2.get('http://api.paytek-africa.com/api/file/info',{responseType: ResponseContentType.Blob})
        .toPromise()
        .then((resposta)=>{
          return {
            filename: 'seguranca.pptx',
            data: resposta.blob()
          }
        }).then(res=>{
            console.log(res)
            let url = window.URL.createObjectURL(res.data);
            let a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url; 
            a.download = res.filename;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove(); // remove the element
        })
    }
}