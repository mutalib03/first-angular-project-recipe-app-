import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
 
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}



//////////////////////////////////////////// DOCUMENTATION /////////////////////////////////////////////////////

// This code defines an Angular service called RecipesResolverService, which implements the Resolve interface and is designed to be used as a resolver for a route in an Angular application. A resolver is used to fetch data from a server or other data source before a route is activated.

// The RecipesResolverService constructor takes two arguments: DataStorageService and RecipeService, which are two other Angular services used to retrieve and manage recipe data.

// The resolve method is called when the route is activated, and it takes two arguments: ActivatedRouteSnapshot and RouterStateSnapshot, which represent the current state of the route.

// Inside the resolve method, the getRecipes method of RecipeService is called to retrieve any existing recipe data. If there are no existing recipes, the fetchRecipes method of DataStorageService is called to fetch the recipe data from the server.

// The RecipesResolverService class is decorated with the @Injectable decorator, which means it can be injected as a dependency into other Angular components and services. The providedIn property is set to 'root', which means the service will be provided at the root level of the application.

// In summary, RecipesResolverService is an Angular service that is used to fetch recipe data from a server or other data source before a route is activated. It uses the DataStorageService and RecipeService to manage the recipe data and implements the Resolve interface to handle the resolution of the data.