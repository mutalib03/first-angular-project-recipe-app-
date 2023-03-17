import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';

import { AuthInterceptorService } from './Auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, SharedModule],
  
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}


//////////////////////// Documentation ////////////////////////////

// This is an Angular module definition file that defines the metadata for the application module. The file starts with importing several modules such as BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, and AppRoutingModule.

// The BrowserModule module is required for all Angular applications that run in the browser, while the other imported modules provide additional functionality such as forms, reactive forms, and HTTP services. The SharedModule is also imported, which likely contains reusable components and services that are shared across multiple modules.

// The file then defines two components, AppComponent and HeaderComponent, which are declared in the declarations array. These components represent the visual parts of the application and can be used in other components and templates.

// The next section defines two services, ShoppingListService and RecipeService, which are provided in the providers array. These services can be injected into other components and services throughout the application.

// Finally, the module provides an HTTP interceptor, AuthInterceptorService, which is used to intercept HTTP requests and add authentication headers before they are sent to the server. The multi: true option indicates that this interceptor can be chained with other interceptors, if needed.

// In summary, this file defines the metadata for the application module, including its dependencies, components, services, and an HTTP interceptor. It's an essential part of an Angular application that allows developers to organize and structure the code in a modular and reusable way.