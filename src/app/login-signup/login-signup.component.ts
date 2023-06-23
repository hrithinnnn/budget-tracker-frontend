import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StringExpressionOperatorReturningBoolean } from 'mongoose';
import { UserServicesService } from '../user-services.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  pending!: boolean;
  credError!: boolean;
  constructor(private route: Router, private authService: UserServicesService) { }
  ngOnInit(): void {
    this.logIn = this.route.url == '/login' ? true : false;
  }
  checked!: boolean;
  logIn: boolean = true;;
  email!: String;
  password!: String;
  name!: String;
  togglePage() {
    // this.logIn!=this.logIn;
    this.route.navigateByUrl(this.logIn ? '/signup' : '/login');
    console.log(this.logIn)
  }

  load() {
    this.checked = !!localStorage.getItem("isDarkMode");
    console.log(document.querySelector('mat-slide-toggle'));

    if (document.querySelector('mat-slide-toggle')) {
      console.log("if", document.querySelector('mat-slide-toggle'));

      this.initDarkMode();
    }
    else { console.log("else", document.querySelector('mat-slide-toggle')); this.load(); }
  }

  ngAfterViewInit() {
    this.load()
  }

  submit() {
    if(this.validate()===0) this.credError=false;
    if (this.credError) { return; }
    else {
      if (this.logIn) {

        this.pending = true;

        this.authService.login(this.email, this.password).subscribe((res) => {

          console.log(res);

          this.pending = false;

          // if(res.errorString === "Wrong credentials" || res.status === 400) {

          //     this.credError = true;
          //     return;
          // }

          // this.credError = false;

          // this.userService.currentUser = this.getControl('email').value;

          this.route.navigate(['/home']);

        });

      } else {

        this.pending = true;

        this.authService.signup(this.name, this.email, this.password).subscribe((res) => {

          console.log(res);

          this.pending = false;

          if (res.status === 400) {

            return;
          }

          this.route.navigateByUrl("/login");

        });
      }

    }
  }
  initDarkMode() {

    const element1 = document.getElementById('container-log');
    // const element2 = document.querySelector('mat-drawer-content')
    // const element3 = document.querySelector('mat-slide-toggle')
    // const isChecked = !!localStorage.getItem("isDarkmode");
    // this.checked=!!this.checked; ;
    console.log(this.checked)
    console.log(element1?.getAttribute('class'), element1)
    // console.log(element2?.getAttribute('class'),element2)
    // //elemts 2  and 3 not loading hence not updating. fix it.
    // console.log(element3?.getAttribute('class'),element3)
    if (this.checked) {
      element1?.classList.add('dark-mode')
      // element2?.classList.add('dark-mode')
      // element3?.classList.add('dark-mode')
      // localStorage.setItem("isDarkMode", "true")
    }
    else {
      element1?.classList.remove('dark-mode')
      // element2?.classList.remove('dark-mode')
      // element3?.classList.remove('dark-mode')
      // localStorage.removeItem("isDarkmode")
    }
    // if (isChecked) {
    //   element1?.classList.add('dark-mode')
    //   element2?.classList.add('dark-mode')
    //   element3?.classList.add('dark-mode')
    //   localStorage.setItem("isDarkMode","true")
    //   this.checked = true;
    // }
    // else {
    //   element1?.classList.remove('dark-mode')
    //   element2?.classList.remove('dark-mode')
    //   element3?.classList.remove('dark-mode')
    //   // localStorage.removeItem("isDarkmode")
    //   this.checked = false;
    // }
  }

  toggleDarkMode() {

    const element1 = document.querySelector('mat-drawer-content');
    const element2 = document.querySelector('#container-log')
    const element3 = document.querySelector('mat-toolbar')
    // const isChecked = !!localStorage.getItem("isDarkmode");
    // this.checked=!!this.checked; ;
    console.log(this.checked)
    // console.log(element?.getAttribute('class'),element)
    if (this.checked) {
      element1?.classList.add('dark-mode')
      element2?.classList.add('dark-mode')
      element3?.classList.add('dark-mode')
      localStorage.setItem("isDarkMode", "true")
    }
    else {
      element1?.classList.remove('dark-mode')
      element2?.classList.remove('dark-mode')
      element3?.classList.remove('dark-mode')
      localStorage.removeItem("isDarkMode")
    }
    // if (isChecked) {
    //   element1?.classList.add('dark-mode')
    //   element2?.classList.add('dark-mode')
    //   element3?.classList.add('dark-mode')
    //   localStorage.setItem("isDarkMode","true")
    //   this.checked = true;
    // }
    // else {
    //   element1?.classList.remove('dark-mode')
    //   element2?.classList.remove('dark-mode')
    //   element3?.classList.remove('dark-mode')
    //   // localStorage.removeItem("isDarkmode")
    //   this.checked = false;
    // }
  }
  validate() {
    // console.log(this.name,"name")
    if (this.logIn && (!this.email || !this.password)) {

      this.credError = true;
      return 1;
    }

    if (!this.logIn && (!this.email || !this.password || !this.name)) {
      this.credError = true;
      console.log(this.credError, "name");
      return 1;
    }
    return 0;

  }

}
