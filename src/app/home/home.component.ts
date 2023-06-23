import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { AppServicesService } from '../app-services.service';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { income } from '../../income';
import { expense } from 'src/expenses';
import { Long } from 'mongodb';
import { EditTransactionComponent } from '../edit-transaction/edit-transaction.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangePwComponent } from '../change-pw/change-pw.component';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';
// import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allTimeSpent!: number;
  constructor(private user: AppServicesService,private dialog:MatDialog) { }
  description: any;
  expenses: expense[] = [];
  incomes: income[] = [];
  amount!: number;
  date!: string;
  error:boolean=false;
  //  d!:Date;
  title!: string;
  // @Output() titleChange = new EventEmitter<string>();
  // @Output() titleEmit = new EventEmitter<any>();
  options = [{ value: 'income', viewValue: 'income' },
  { value: 'expense', viewValue: 'expense' }]
  type!: string;
  dailyExpenseSpent: number = 0;
  weeklyExpenseSpent: number = 0;
  monthlyExpenseSpent: number = 0;
  yearlyExpenseSpent: number = 0;

  @ViewChild('picker') picker!: MatDatepicker<any>;

  ngOnInit(): void {

    this.load();
  }

  ngAfterViewInit(){
    const element = document.querySelector('mat-toolbar');
    if (localStorage.getItem("isDarkMode")){
      element?.classList.add("dark-mode")
    }
  }
  load() {
    this.getIncomes();
    this.getExpenses();
    // this.updateValues();
    // this.weeklyExpense();
  }

  updateValues() {
    // console.log(this.expenses)
    this.dailyExpense();
    this.weeklyExpense();
    this.monthlyExpense();
    this.yearlyExpense();
    this.allTimeExpense();
    this.updateNumberColor();

  }

  fn(event: MatDatepickerInputEvent<any>) {

    this.date = event.value;
    console.log(this.title)
    console.log(this.amount)
    console.log(this.date);


  }


  add() {

    if(this.validate()===0) this.error=false;
    if (this.error){
      return;
    }
    else{
    this.user.addTransaction(this.title, this.amount, this.date, this.type).subscribe((res) => {

      console.log(res)
      // this.load();
      // location.reload()
      this.getIncomes();
    })
    // console.log(this.description)

  }
}

  getIncomes() {
    
    this.user.showIncomes().subscribe((res) => {
      this.incomes = res.docs;
      console.log(this.incomes)
      this.getExpenses();
    })
  }

  getExpenses() {
    let title = "food";
    let email = "hrtihin@gmail.com";
    let desc = "lskjnd";
    let type = "expense";
    this.user.showExpenses().subscribe((res) => {
      this.expenses = res.docs;
      console.log(this.expenses)
      this.updateValues();
    })
  }
  dailyExpense() {
    this.dailyExpenseSpent = 0;
    for (let i = 0; i < this.incomes.length; i++) {

      let n = new Date(this.incomes[i].date);
      let today = new Date()
      if (n.getDate() === today.getDate() && n.getMonth() == today.getMonth() && n.getFullYear() === today.getFullYear()) {
        this.dailyExpenseSpent += (this.incomes[i].amount)
      }
    }

    for (let i = 0; i < this.expenses.length; i++) {
      console.log((this.expenses[i].amount))
      console.log(this.dailyExpenseSpent)
      let n = new Date(this.expenses[i].date);
      let today = new Date()
      console.log(this.expenses[i].date)
      if (n.getDate() === today.getDate() && n.getMonth() == today.getMonth() && n.getFullYear() === today.getFullYear()) {
        this.dailyExpenseSpent -= (this.expenses[i].amount)
        // console.log(this.dailyExpenseSpent)
      }
    }

      const daily = document.getElementById("daily-expenses");
      // console.log(this.dailyExpenseSpent);
      daily!.innerText = this.dailyExpenseSpent.toString();
    }
  
  monthlyExpense() {
    this.monthlyExpenseSpent = 0;
    const monthly = document.getElementById("monthly-expenses");
    for (let i = 0; i < this.incomes.length; i++) {
      // console.log(this.incomes.length);

      let n = new Date(this.incomes[i].date);
      let today = new Date()
      if (n.getMonth() == today.getMonth() && n.getFullYear() === today.getFullYear()) {
        this.monthlyExpenseSpent += (this.incomes[i].amount)
      }
    }
    for (let i = 0; i < this.expenses.length; i++) {

      let n = new Date(this.expenses[i].date);
      let today = new Date()
      if ( n.getMonth() == today.getMonth() && n.getFullYear() === today.getFullYear()) {
        this.monthlyExpenseSpent -= (this.expenses[i].amount)
      }
    }
    monthly!.innerText = this.monthlyExpenseSpent.toString();
  }
  yearlyExpense() {
    this.yearlyExpenseSpent = 0;
    const yearly = document.getElementById("yearly-expenses");
    for (let i = 0; i < this.incomes.length; i++) {

      let n = new Date(this.incomes[i].date);
      let today = new Date()
      if (n.getFullYear() === today.getFullYear()) {
        this.yearlyExpenseSpent += (this.incomes[i].amount)
      }
    }
    for (let i = 0; i < this.expenses.length; i++) {

      let n = new Date(this.expenses[i].date);
      let today = new Date()
      if (n.getFullYear() === today.getFullYear()) {
      this.yearlyExpenseSpent -= (this.expenses[i].amount)
      }
    }
    yearly!.innerText = this.yearlyExpenseSpent.toString();

  }
  weeklyExpense() {
    this.weeklyExpenseSpent = 0;
    const weekly = document.getElementById("weekly-expenses");
    const today = new Date().getTime();
    const oneWeekAgo = today - 7 * 24 * 60 * 60 * 1000;
    for (let i = 0; i < this.incomes.length; i++) {

      let n = new Date(this.incomes[i].date).getTime();
      // console.log(n, oneWeekAgo, today);
      if (n >= oneWeekAgo && n <= today) {
        this.weeklyExpenseSpent += (this.incomes[i].amount)
      }
    }
    for (let i = 0; i < this.expenses.length; i++) {

      let n = new Date(this.expenses[i].date).getTime();;
      if (n >= oneWeekAgo && n <= today) {
        this.weeklyExpenseSpent -= (this.expenses[i].amount)
      }
    }
    weekly!.innerText = this.weeklyExpenseSpent.toString();
  }

  allTimeExpense(){
    this.allTimeSpent = 0;
    const allTime = document.getElementById("net-expenses");
    console.log(allTime);
    
    for (let i = 0; i < this.incomes.length; i++) {

      // let n = new Date(this.incomes[i].date).getTime();
      // console.log(n, oneWeekAgo, today);
      // if (n >= oneWeekAgo && n <= today) {
        this.allTimeSpent += (this.incomes[i].amount)
      // }
    }
    for (let i = 0; i < this.expenses.length; i++) {

      // let n = new Date(this.expenses[i].date).getTime();;
      // if (n >= oneWeekAgo && n <= today) {
        this.allTimeSpent -= (this.expenses[i].amount)
      // }
    }
    allTime!.innerText = this.allTimeSpent.toString();
  }
  deleteIncome(inc:income){
    this.user.deleteTransaction(inc._id,"income").subscribe((res)=>{
      console.log(res);
      this.getIncomes();
    })
    console.log(inc._id);

  }
  deleteExpense(exp:expense){
    this.user.deleteTransaction(exp._id,"expense").subscribe((res)=>{
      console.log(res);
      this.getExpenses();
    })
    console.log(exp._id);

  }
  editIncome(obj:income){
  //   this.dialog.open(EditTransactionComponent, {
  //     data: obj,
  //  });
  
  }
  edit(obj:expense|income){
    console.log(obj)
    this.dialog.open(EditTransactionComponent, {
          data: obj,
       });
  }
  changePassword(){
    this.dialog.open(ChangePwComponent)
  }
  DeleteProfile(){
    this.dialog.open(DeleteProfileComponent);
  }
  updateNumberColor() {
    // n=document.getElementsByClassName('number');
    let n = document.getElementsByClassName("numbers");
    for (let i = 0; i < n.length; i++) {
      if (parseInt(n[i].innerHTML) < 0) {
        //n[i].innerHTML = Math.abs(parseInt(n[i].innerHTML));
        (<HTMLElement>n[i]).style.color = "red";
      }
      else {
        (<HTMLElement>n[i]).style.color = "green";
      }
    }
  }
  validate(){
    if(!this.title||!this.amount||!this.type||!this.date){
      this.error=true;
      return 1;
    }
    return 0;
  }
}
