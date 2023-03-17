import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../Auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-e04d5-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-e04d5-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}


////////////////////////////////////// DOCUMENTATION /////////////////////////////////////////////////////

// The above code is a TypeScript file that defines a service class named DataStorageService. The purpose of this service is to fetch and store recipe data using an HTTP request.

// The DataStorageService class uses Angular's HttpClient to send HTTP requests. It also injects two other services - RecipeService and AuthService.

// The class contains two methods:

// storeRecipes(): This method retrieves the list of recipes from the RecipeService, sends a PUT HTTP request to the Firebase Realtime Database, and stores the recipe data in the database. This method does not return any value. If the request is successful, it logs the response to the console.

// fetchRecipes(): This method sends a GET HTTP request to the Firebase Realtime Database to fetch the list of recipes. It then uses the RxJS map operator to modify the returned data, ensuring that the ingredients property is always an array. Finally, the tap operator is used to set the retrieved recipes in the RecipeService. This method returns an Observable that emits the modified recipe data.

// The DataStorageService class is decorated with the @Injectable decorator, which makes it injectable throughout the application. The providedIn property of the decorator is set to root, which means that the service is provided at the root level of the application.