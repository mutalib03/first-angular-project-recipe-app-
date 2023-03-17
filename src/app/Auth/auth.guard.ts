import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}

///////////////////////////////////////////       DOCUMENTATION         /////////////////////////////////////////////

// This code defines an AuthGuard class which implements the CanActivate interface in Angular. This means that this class can be used to protect routes in an Angular application based on whether the user is authenticated or not.

// The AuthGuard class has a constructor that takes two dependencies: an AuthService and a Router. The AuthService is used to check if the user is authenticated or not, while the Router is used to navigate to a different route if the user is not authenticated.

// The canActivate method of the AuthGuard class is where the logic for determining whether the user is authenticated or not is implemented. This method takes two parameters: route which represents the current route being accessed and state which represents the current state of the router.

// The canActivate method returns a boolean, UrlTree, Observable<boolean | UrlTree>, or Promise<boolean | UrlTree>. The return type depends on how the user object is retrieved from the AuthService.

// The canActivate method retrieves the user object from the AuthService by calling the user property of the AuthService and passing it through a pipe that takes two operators: take(1) and map(). The take(1) operator ensures that only the first value emitted by the user observable is used. The map() operator transforms the user object to a boolean value indicating whether the user is authenticated or not.

// If the user is authenticated, the canActivate method returns true. If the user is not authenticated, the canActivate method creates a new UrlTree object that redirects the user to the login page by calling the createUrlTree() method of the Router object.

// Overall, the AuthGuard class can be used to protect routes in an Angular application by checking whether the user is authenticated or not using the AuthService and navigating to a different route if the user is not authenticated using the Router.
