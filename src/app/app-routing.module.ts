import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },

  {
    path: 'auth',
    loadChildren: () => import('./Auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/////////////////////////DOCUMENTATION////////////////

// This code defines the routing configuration for the Angular application. It uses the RouterModule to define a set of routes, which are then imported and exported by the AppRoutingModule module.

// The routes are defined using an array of Route objects. Each Route object maps a URL path to a component or a lazy-loaded module. The first route in the array maps the empty path ('') to the RecipesComponent, which will be the default route for the application. The other routes map specific paths to lazy-loaded modules using the loadChildren property.

// Lazy loading is a technique used to optimize the performance of large applications by loading modules only when they are needed. This allows the initial page load time to be reduced, as the browser doesn't have to load all the modules upfront.

// The AppRoutingModule module imports the RouterModule and defines a preloading strategy using PreloadAllModules. This strategy will preload all lazy-loaded modules in the background, once the initial page load is complete, to reduce the load time when navigating to those routes.

// Overall, this code defines the routes and their associated lazy-loaded modules for the Angular application, and sets a preloading strategy to optimize performance.

// Regenerate response
