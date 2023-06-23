import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from './user-services.service';
import { ChangePwComponent } from './change-pw/change-pw.component';
import { MatDateFormats } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('drawer') public drawer: MatDrawer | undefined;
  title = 'budget-tracker';
  showFiller = false;
  checked = false;
  user!:String;
  actions = [
    {
      name: "home",
      route: "/home"
    },

    {
      name: "logout",
      route: "/login"
    }
  ];

  get isAuth() {

    return this.authService.isAuthenticated;
  }


  constructor(private router: Router, private authService: UserServicesService, private dialog: MatDialog) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    // localStorage.getItem("isDarkMode");
    this.load()
  }

  getName(){
    this.authService.getName().subscribe((doc)=>{
      console.log("get name",doc[0].name)
      this.user=doc[0].name;
    })
  }
  load(){
    this.getName();
    this.checked=!! localStorage.getItem("isDarkMode");
    console.log(this.checked, "checked value")
    // setTimeout(this.initDarkMode, 1000);
    this.initDarkMode()
    // this.checked!=this.checked
    // this.toggleDarkMode()
    // this.checked!=this.checked
    // this.toggleDarkMode()

  }


  goTo(route: string) {

    console.log(route);

    if (route === "/home") {

      if (!this.authService.isAuthenticated) { console.log(this.authService.isAuthenticated); return; }

      // this.authService.decodeToken(localStorage.getItem("token")!).subscribe((res) => {

      //   if(res.status === 400){console.log("error"); return ;} 

      //   const email = res.data.decoded;

      this.router.navigateByUrl(`/home`);

      // });

      return;
    }

    if (route === "/login") {

      this.authService.loggingOut = true;

      console.log(this.authService.isAuthenticated);

      if (!this.authService.isAuthenticated) return;

      this.authService.logout().subscribe((res: any) => {

        if (res.status === 400) return;
        localStorage.removeItem("token");
        this.router.navigateByUrl("/login");
      })
    }

    this.router.navigateByUrl(route);
  }
  editprofile() {
    this.dialog.open(ChangePwComponent)
  }
  myFunction() {
    const x = document.getElementById("container");
    x!.classList.toggle("change");
  }
  deleteAccount() {
    this.dialog.open(DeleteProfileComponent)
  }
  toggleDarkMode() {

    const element1 = document.querySelector('mat-drawer');
    const element2 = document.querySelector('mat-drawer-content')
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
  initDarkMode() {

    const element1 = document.querySelector('mat-drawer');
    const element2 = document.querySelector('mat-drawer-content')
    const element3 = document.querySelector('mat-toolbar')
    // const isChecked = !!localStorage.getItem("isDarkmode");
    // this.checked=!!this.checked; ;
    console.log(this.checked)
    console.log(element1?.getAttribute('class'),element1)
    console.log(element2?.getAttribute('class'),element2)
    //elemts 2  and 3 not loading hence not updating. fix it.
    console.log(element3?.getAttribute('class'),element3)
    if (this.checked) {
      element1?.classList.add('dark-mode')
      element2?.classList.add('dark-mode')
      element3?.classList.add('dark-mode')
      // localStorage.setItem("isDarkMode", "true")
    }
    else {
      element1?.classList.remove('dark-mode')
      element2?.classList.remove('dark-mode')
      element3?.classList.remove('dark-mode')
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
}
