import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  isLoginMode = true;
  isLoading: boolean = false;
  error: string = null;
  closeSub: Subscription;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    this.isLoading = true;
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe(
        (data) => {
          console.log(data);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        (error) => {
          console.log(error);
          this.error = error;
          this.showErrorAlert(error);
          this.isLoading = false;
        }
      );
    } else {
      this.authService.signup(email, password).subscribe(
        (data) => {
          console.log(data);
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.error = error;

          this.isLoading = false;
        }
      );
    }

    this.authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(error) {
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = error;

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}



////////////////////  Documentation for creating component programmatically  (showError function)



// The showErrorAlert function is responsible for creating an instance of the AlertComponent programmatically and displaying an error message inside it. This function is called when there is an error during authentication, and the AuthService returns an error.

// The function starts by resolving the AlertComponent using the componentFactoryResolver. This is necessary because the AlertComponent is not declared in the AuthComponent template, and we need to get a reference to its factory to create an instance of it.

// After resolving the AlertComponent, the function creates an instance of it using the createComponent method of the ViewContainerRef. The ViewContainerRef is obtained from the PlaceholderDirective using ViewChild.

// The AlertComponent instance is then customized by setting its message property to the error message passed as an argument.

// The function also subscribes to the close event of the AlertComponent, which is emitted when the user clicks the close button. When the event is triggered, the function unsubscribes from the event, clears the ViewContainerRef, and removes the AlertComponent from the view.

// Overall, the showErrorAlert function is a useful utility that allows us to display an error message in a custom component and handle its lifecycle programmatically.