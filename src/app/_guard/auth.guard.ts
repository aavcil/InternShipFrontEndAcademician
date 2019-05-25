import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(private router: Router, private logservice: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const permission = route.data["permission"];

    let canActivate: boolean;
    if (!this.logservice.loggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    if (!permission) throw new Error('Permissions is not setup!');
    if (!permission.only.length) throw new Error('Roles are not setup!');
    canActivate = permission.only.includes(this.logservice.userGroup);
    if (!canActivate) this.router.navigate([permission.redirectTo]);
    return canActivate;
  }

}
