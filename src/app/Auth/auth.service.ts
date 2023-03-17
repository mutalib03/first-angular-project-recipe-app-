import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  email: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })

export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      setTimeout(() => {
        this.logout();
      }, expirationDuration);
    });
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));

    console.log(userData, document.cookie);

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists';
        break;

      case 'EMAIL_NOT_FOUND':
        errorMessage = 'this email does not exist';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }

    return throwError(() => new Error(errorMessage));
  }
}

               /////////////////////////////////////    DOCUMENTATION     /////////////////////////////////////////////////////

// The above code is an Angular service that handles user authentication using Firebase Authentication API. It exposes various methods for signing up, logging in, and logging out a user. It also contains methods for auto-logging in and auto-logging out a user.

// The service starts by importing the necessary Angular and Firebase Authentication API modules. It also defines an interface for the authentication response data.

// The AuthService class is defined as an injectable service, which means it can be injected into any component or service that requires it. It contains a user BehaviorSubject that will emit the current authenticated user, if any.

// The constructor of the service takes two parameters: HttpClient and Router. HttpClient is used for making HTTP requests to the Firebase Authentication API, while Router is used for navigating to different routes in the application.

// The signup() method is used for registering a new user. It makes a POST request to the Firebase Authentication API with the user's email and password. It returns an Observable that emits the authentication response data. The catchError operator is used to handle any errors that may occur during the request. The tap operator is used to handle the authentication response data and store it in the user BehaviorSubject.

// The login() method is similar to the signup() method, but it is used for logging in an existing user.

// The logout() method is used for logging out a user. It clears the user BehaviorSubject, navigates to the login page, and removes the user data from the local storage. It also clears the token expiration timer if it exists.

// The autoLogout() method is used for automatically logging out a user after a specified amount of time. It takes an expirationDuration parameter that specifies the time after which the user should be logged out. It sets a timer to call the logout() method after the specified time.

// The autoLogin() method is used for automatically logging in a user when they visit the site. It checks if there is any user data stored in the local storage. If there is, it creates a new User object with the stored data and sets it in the user BehaviorSubject. It also sets a token expiration timer using the autoLogout() method.

// The handleAuthentication() method is used for handling the authentication response data. It creates a new User object with the response data and stores it in the user BehaviorSubject. It also sets a token expiration timer using the autoLogout() method and stores the user data in the local storage.

// The handleError() method is used for handling any errors that may occur during the HTTP requests. It checks the error message and returns an appropriate error message as an Observable.

// Overall, this AuthService class provides a robust and reusable way of handling user authentication in an Angular application.
