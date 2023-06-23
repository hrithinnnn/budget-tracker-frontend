import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, of, tap } from 'rxjs';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  loggingOut = false;
  get isAuthenticated(): boolean {

    return !!localStorage.getItem("token");
  }


  constructor(private http:HttpClient,private feedback: FeedbackService) { }
  // API_URL="http://localhost:5000"
  API_URL="https://budget-tracker-backend-hja2.onrender.com"

  decodeToken(token: string) {

    return this.http.get(this.API_URL + '/jwt/decode', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': localStorage.getItem("token")!
      })
    }).pipe(

      tap((res: any) => {

        if(res.status === 400) throw new Error("error");
      }),


      catchError(err => {

        this.feedback.openSnackBar("error: token error");  
        return of({errorString: "error", status: err.error.status});;

      })

    );
  }

  login(email:String, password:String){
    return this.http.post(`${this.API_URL}/login`,{email,password},{
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'ignore-token': 'true'
      })
    }).pipe(

      tap((res: any) => {

        if(res.status === 400) throw new Error("error");
        else{
          console.log(res.data.token)
          localStorage.setItem("token",res.data.token);
        }
        this.feedback.openSnackBar(res.message)
      }),


      catchError(err => {

        this.feedback.openSnackBar("error");
        return of({errorString: "error", status: err.error.status});
      })

    );
  }

signup(name: String, email: String, password: String) {

    return this.http.post(this.API_URL + '/signup', {
      name, email, password
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'ignore-token': 'true'
      })
    }).pipe(

      tap((res: any) => {

        if(res.status === 400) throw new Error("error");
        this.feedback.openSnackBar(res.message)

      }),


      catchError(err => {

        this.feedback.openSnackBar("error");
        return of({errorString: "error", status: err.error.status});
      })

    );
  }

  /**
   * METHOD: POST
   * /logout
   */

  logout() {

    return this.http.post(this.API_URL + '/logout', {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': localStorage.getItem("token")!
      })
    }).pipe(

      tap((res: any) => {

        if(res.status === 400) throw new Error("error");
        this.feedback.openSnackBar(res.message)
        console.log(localStorage.getItem("token"));
        

      }),


      catchError(err => {

        // this.feedback.openSnackBar("error");
        return of({ err});;

      })

    );
    localStorage.removeItem("token")
  }

  getName(){
    return this.http.post(this.API_URL+"/getname",{}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': localStorage.getItem("token")!
      })
    }).pipe(
      tap((res: any) => {

        if(res.status === 400) throw new Error("error");
        // this.feedback.openSnackBar(res.message)
        console.log(localStorage.getItem("token"));
        

      }),


      catchError(err => {

        // this.feedback.openSnackBar("error");
        return of({ err});;

      })

    )
  }
  

}
