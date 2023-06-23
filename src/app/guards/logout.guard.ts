import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { UserServicesService } from "../user-services.service";

@Injectable()
export class LogOutGuard implements CanActivate {
  constructor(private router: Router, private authService: UserServicesService) {}

  canActivate() {
    // this.store.dispatch(logout());
    // return this.router.createUrlTree(['auth', 'login']);
    if(this.authService.loggingOut) return true;
    console.log(this.authService.isAuthenticated)
    if(this.authService.isAuthenticated) {

        history.back();
        return false;
    }

    return true;
  }
}