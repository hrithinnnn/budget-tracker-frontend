import { Component, OnInit } from '@angular/core';
import { AppServicesService } from '../app-services.service';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']
})
export class DeleteProfileComponent implements OnInit{
  error: boolean=false;
  constructor(private user: AppServicesService) { }
  del = ''
  checked!:boolean;
  deleteAccount() {
    console.log(this.del)
    if(this.validate()===0) this.error=false;
    if(this.error){return;}
    else{
    if (this.del === 'delete') {
      this.user.deleteAccount().subscribe((res) => {
        console.log(res);
        setTimeout(() => {
          this.pageReload()
        }, 1000);
      })
    }
  }
}
  pageReload() {
    location.reload();
  }
  ngOnInit(): void {
    // localStorage.getItem("isDarkMode");
    this.load()
  }
  load(){
    this.checked=!! localStorage.getItem("isDarkMode");
    console.log(this.checked, "checked value")
    // setTimeout(this.initDarkMode, 1000);
    this.initDarkMode()
    // this.checked!=this.checked
    // this.toggleDarkMode()
    // this.checked!=this.checked
    // this.toggleDarkMode()

  }
  initDarkMode() {

    const element1 = document.getElementById('container-del');
    // const element2 = document.querySelector('mat-drawer-content')
    // const element3 = document.querySelector('mat-toolbar')
    // const isChecked = !!localStorage.getItem("isDarkmode");
    // this.checked=!!this.checked; ;
    console.log(this.checked)
    console.log(element1?.getAttribute('class'),element1)
    // console.log(element2?.getAttribute('class'),element2)
    //elemts 2  and 3 not loading hence not updating. fix it.
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
  validate(){
    if(this.del!="delete"){
      this.error=true;
      return 1
    }
    return 0;
  }
}
