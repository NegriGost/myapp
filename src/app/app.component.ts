import { AppService } from './app.service';
import { Component } from '@angular/core';
import { User } from './user.model';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public inicio:boolean=true;
  public email:string='';
  public password:string='';
  public dwd:boolean=true

  constructor(public appSvs:AppService ){}

  login(){
    if(this.email!=='')
      this.inicio=false
  }

  salvar(){
    if(this.password!==''){
      let user:User=new User()
      user.email=this.email
      user.senha=this.password
      this.appSvs.loginUser(user)
      this.dwd=false
    }
  }

  pegarEmail(email){
    this.email=email
  }

  pegarPassword(password){
    this.password=password
  }
  download(){
    this.appSvs.downloadFile()
  }
}
