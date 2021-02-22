import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {UsersService} from "../services/users.service";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {
  private user: User | null = null;
  private userSub: Subscription;
  constructor(private userService: UsersService,
              private router: Router) {
    this.userSub = this.userService.getCurrentUser().subscribe(user => this.user = user);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(this.user)
    this.userService.getCurrentUser().toPromise().then(user => console.log('aaaaa', user))
    if (this.user && this.user.hasAccessR) {
      return true;
    } else {
      return this.router.parseUrl("/home");
    }
  }

}
