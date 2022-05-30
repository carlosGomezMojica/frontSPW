import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map, Observer, Subscription } from 'rxjs';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  public codigoUsuario?:Number;
  public pass?:String;

  public sub:Subscription;
  public temporal:any;
  constructor( public router:Router, public activatedRoute:ActivatedRoute , public access:AccessService) {
    this.sub = this.temporal;
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }    
  }

  startSession(){
    const credential = {codigoUsuario:this.codigoUsuario,password: this.pass};
    const anyObserver: Observer<any> = {
      next(response) {
        console.log(response);
      },
      error(error) {
        console.log(error);
      },
      complete() {
        console.log('Complete');
      },
    };
    this.sub = this.access.login(credential).pipe(map((res)=>{
      localStorage.setItem("access_token",res.body.token.access_token);
      localStorage.setItem("idUsuario",res.body.usr._id);
      localStorage.setItem("type",res.body.usr.tipoUsuario);
      if (res.body.usr.tipoUsuario === "GE") {
        this.router.navigate(["/index/gerente"])
      }else if(res.body.usr.tipoUsuario === "EM"){
        this.router.navigate(["/index/cajero"])
      }
    })).subscribe(anyObserver);
  }

}
