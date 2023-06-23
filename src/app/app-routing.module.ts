import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInGuard } from './guards/login.guard';
import { LogOutGuard } from './guards/logout.guard';
import { HomeComponent } from './home/home.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { ChangePwComponent } from './change-pw/change-pw.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginSignupComponent,
    canActivate: [LogOutGuard],
  },
  {
    path: 'signup',
    component: LoginSignupComponent,
    canActivate: [LogOutGuard],           
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LogInGuard]
  },
  {
    path: 'editprofile',
    component: ChangePwComponent,
    canActivate: [LogInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
