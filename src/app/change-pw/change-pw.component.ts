import { Component, OnInit } from '@angular/core';
import { AppServicesService } from '../app-services.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.css']
})
export class ChangePwComponent implements OnInit{
  error!: boolean;
  constructor(private user:AppServicesService, private dialog:MatDialog){}
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  checked!:boolean
  email!:String;
  oldPassword!:String;
  newPassword!:String;
  name!:String;
  submit(){
    if(this.validate()===0) this.error=false;
    if(this.error){return;}
    else{
    this.user.changePassword(this.email,this.oldPassword,this.newPassword).subscribe((res=>{
      console.log(res);
      setTimeout(this.pageReload,1000)
    }))
  }
}
pageReload(){
  location.reload();
}
  deleteAccount(){
    this.dialog.open(DeleteProfileComponent);
  }
  ngOnInit(): void {
    // localStorage.getItem("isDarkMode");
    this.load()
  }
  initDarkMode() {

    const element1 = document.getElementById("container-pw")
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

  validate(){
    if(!this.email||!this.oldPassword||!this.newPassword){
      this.error=true;
      return 1
    }
    return 0;
  }


}
