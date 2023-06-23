import { Component, EventEmitter, Inject, Input } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AppServicesService } from '../app-services.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { income } from 'src/income';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css'],
  // providers: [
  //   { provide: MAT_DIALOG_DATA, useValue: {} },
  //   { provide: MatDialogRef, useValue: {} }
  // ]
})

export class EditTransactionComponent {
  error: boolean=false;
  flag:boolean= false;
  constructor(private user:AppServicesService,private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private route: Router,private dialogRef: MatDialogRef<EditTransactionComponent>){}
  // title!:String;
  checked!:boolean
  amount=this.data.amount;
  date=this.data.date;
  type=this.data.type;
  title=this.data.title;
  options = [{ value: 'income', viewValue: 'income' },
  { value: 'expense', viewValue: 'expense' }]
  object=this.data;
  fn(event: MatDatepickerInputEvent<any>) {

    this.date = event.value;
    console.log(this.title,this.object.amount, this.object.type)
    console.log(this.data.type)
    // console.log(this.type);


  }
  ngAfterViewInit(): void {
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
  // titleEmit.listen
  // bruh($event: EventEmitter<any>) { this.title1 = $event.value; console.log(this.title1)}

  edit(){
    if(this.validate()===0) this.error=false;
    if (this.error){
      return;
    }
    else{
    let obj={_id:this.data._id,type:this.type,title:this.title,user:this.data.user,date:this.date,amount:this.amount}
    console.log(obj)
    this.user.editTransaction(obj).subscribe((res)=>{
      console.log(res)
      setTimeout(this.pageReload, 1000)
      
    
    })
  }
}



pageReload(){
  location.reload()
}


  initDarkMode() {

    const element1 = document.getElementById('container-edit');
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
    if(!this.title||!this.amount||!this.type||!this.date){
      this.error=true;
      return 1
    }
    return 0;
  }
  // dialogRef = this.matDialog.open(EditTransactionComponent);
  
}
