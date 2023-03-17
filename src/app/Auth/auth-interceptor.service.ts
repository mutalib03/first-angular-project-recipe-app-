import {
  HttpClient,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        //...........   
        if(!user) {
            return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}


                                 ///////////////////////////  DOCUMENTATION //////////////////////////////////////


// This is an Angular service that acts as an HTTP interceptor to add authentication tokens to outgoing requests.

// The service AuthInterceptorService implements the HttpInterceptor interface from @angular/common/http library. It has two dependencies: AuthService and HttpClient.

// The intercept method is the key method in this service that is called by Angular when an HTTP request is made. It takes two arguments: req of type HttpRequest<any> and next of type HttpHandler.

// The method first subscribes to the user observable of AuthService. The take(1) operator ensures that the observable will complete after emitting the first value, so it won't listen for any further changes to the user state.

// The exhaustMap operator is used to map the user value to a new observable that is returned from this method. This helps to ensure that only one request is in progress at a time.

// If the user is not available or null, the request is passed through without modification by calling next.handle(req).

// If the user is available, the request is cloned and modified to add the authentication token to the query parameters. The new HttpParams().set('auth', user.token) creates a new HttpParams object with the authentication token added to it. Then req.clone() method creates a new request object that is a copy of the original req object but with the modified HttpParams object.

// Finally, next.handle(modifiedReq) sends the modified request to the server.

// In summary, this service ensures that every outgoing HTTP request has an authentication token added to the query parameters, but only if the user is authenticated. Otherwise, the request passes through unchanged.