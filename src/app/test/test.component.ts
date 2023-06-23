import { Component } from '@angular/core';
import { UserServicesService } from '../user-services.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
constructor(private user:UserServicesService){}

login(){
  let email="q@w.com";
  let password= "1234";
  this.user.login(email,password).subscribe((res=>{
    console.log(res);

    if (res.status==400) return;
  }))
}

signup(){
  let email="q@w.com";
  let password= "1234";
  let name="hrihtin";
  this.user.signup(name, email,password).subscribe((res=>{
    console.log(res);
  }));
}
logout(){
  this.user.logout().subscribe((res=>{
    console.log(res);
    localStorage.removeItem("token");
  }))
}
}

