import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { FeedbackService } from './feedback.service';
import { income } from 'src/income';
import { expense } from 'src/expenses';
import { UserServicesService } from './user-services.service';

@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  constructor(private http: HttpClient, private feedback: FeedbackService,private user:UserServicesService) { }
  // API_URL = "http://localhost:5000";
  API_URL="https://budget-tracker-backend-hja2.onrender.com"


  showExpenses() {
    return this.http.get(this.API_URL + "/budget/expenses", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': localStorage.getItem("token")!
      })
    }).pipe(

      tap((res: any) => {

        if (res.status === 400) throw new Error(res.error.error.errorString);
        // this.feedback.openSnackBar("added expense")
      }),


      catchError(err => {

        this.feedback.openSnackBar(err.statusText);
        return of({ err });;

      })
      
    )
  }

  showIncomes() {
    return this.http.get(this.API_URL + "/budget/incomes", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': localStorage.getItem("token")!
      })
    }).pipe(

      tap((res: any) => {

        if (res.status === 400) throw new Error(res.error.error.errorString);
      }),


      catchError(err => {

        this.feedback.openSnackBar(err.statusText);
        return of({ err });;

      })
    )
  }

  addTransaction(title: String, amount: number, date: String, type: String) {

    return this.http.post(this.API_URL + "/add", { amount, title, date, type }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': localStorage.getItem("token")!
      })
    }).pipe(

      tap((res: any) => {

        if (res.status === 400) throw new Error(res.error.error.errorString);
        this.feedback.openSnackBar("added transaction")
      }),


      catchError(err => {

        this.feedback.openSnackBar(err);
        return of({ err });;

      })
    )
  }
  deleteTransaction(
    id: String, type: String
  ) {
    return this.http.post(this.API_URL + '/delete', {
      id, type
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': localStorage.getItem("token")!
      })
    }).pipe(

      tap((res: any) => {

        if (res.status === 400) throw new Error(res.error.error.errorString);
        this.feedback.openSnackBar("deleted transaction")
      }),


      catchError(err => {

        this.feedback.openSnackBar(err);
        return of({ err });;

      })

    )
  }

  editTransaction(
    obj: expense | income
  ) {
    return this.http.post(this.API_URL + '/update', {
      obj
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': localStorage.getItem("token")!
      })
    }).pipe(

      tap((res: any) => {

        if (res.status === 400) throw new Error(res.error.error.errorString);
        this.feedback.openSnackBar("edited transaction")
      }),


      catchError(err => {

        this.feedback.openSnackBar(err);
        return of({ err });;

      })

    )
  }

  changePassword(email:String,oldPassword:String,newPassword:String){
    return this.http.post(this.API_URL+"/changepassword",{email,oldPassword,newPassword},{
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': localStorage.getItem("token")!
      })
    }).pipe(

      tap((res: any) => {

        if(res.status === 400) throw new Error(res.error.error.errorString);
        this.feedback.openSnackBar("password changed");
        console.log(localStorage.getItem("token"));
        

      }),


      catchError(err => {

        // this.feedback.openSnackBar(err.error.error.errorString);
        return of({ err});;

      })

    );

  }

  deleteAccount(){
    return this.http.post(this.API_URL+"/deleteprofile",{},{
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': localStorage.getItem("token")!
      })
    }).pipe(

      tap((res: any) => {

        if(res.status === 400) throw new Error(res.error.error.errorString);
        this.feedback.openSnackBar("account deleted")
        console.log(localStorage.getItem("token"));
        

      }),
      tap((res)=>{
        this.user.logout().subscribe((result)=>{
          console.log(result)
          localStorage.removeItem("token");
        });
  }),

      


      catchError(err => {

        // this.feedback.openSnackBar(err.error.error.errorString);
        return of({ err});;

      })


    );

    
    

  }
}
