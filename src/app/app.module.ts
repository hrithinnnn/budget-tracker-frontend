import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { materialModule } from './material.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { ChangePwComponent } from './change-pw/change-pw.component';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { LogInGuard } from './guards/login.guard';
import { LogOutGuard } from './guards/logout.guard';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HomeComponent,
    EditTransactionComponent,
    ChangePwComponent,
    DeleteProfileComponent,
    LoginSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    materialModule,
    MatDatepickerModule, 
    MatMomentDateModule,
    MatNativeDateModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [LogInGuard, LogOutGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
