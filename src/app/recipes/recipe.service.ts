import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   )
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
      

           //////////////////////////////////////////////// DOCUMENTATION /////////////////////////////////////////////////

// Imports
// Injectable is imported from the @angular/core package, which is used to annotate this class as injectable.
// Subject is imported from the rxjs package, which is used to create an observable that emits changes to the list of recipes.
// Recipe and Ingredient are imported from their respective model classes.
// ShoppingListService is imported from the shopping-list.service file, which is used to add ingredients to the shopping list.


// Class Definition
// The RecipeService class is defined with the @Injectable decorator to allow it to be injected with dependencies.
// The recipesChanged property is a Subject that emits changes to the list of recipes.
// The private recipes property is an array of Recipe objects that holds the current list of recipes.
// The constructor takes a ShoppingListService dependency as an argument, which is stored in the slService property.



// Methods
// setRecipes(recipes: Recipe[]): This method takes an array of Recipe objects as an argument and sets the recipes property to this array. It also emits the new list of recipes through the recipesChanged observable.
// getRecipes(): Recipe[]: This method returns a copy of the recipes array.
// getRecipe(index: number): Recipe: This method takes an index as an argument and returns the recipe at that index in the recipes array.
// addIngredientsToShoppingList(ingredients: Ingredient[]): This method takes an array of Ingredient objects as an argument and adds them to the shopping list using the slService dependency.
// addRecipe(recipe: Recipe): This method takes a Recipe object as an argument and adds it to the recipes array. It also emits the new list of recipes through the recipesChanged observable.
// updateRecipe(index: number, newRecipe: Recipe): This method takes an index and a Recipe object as arguments and replaces the recipe at the given index with the new recipe. It also emits the new list of recipes through the recipesChanged observable.
// deleteRecipe(index: number): This method takes an index as an argument and removes the recipe at that index from the recipes array. It also emits the new list of recipes through the recipesChanged observable.


// Properties
// recipesChanged: This is a Subject object that is used to emit changes to the list of recipes. It is used to notify components that are interested in the changes to the recipe list.