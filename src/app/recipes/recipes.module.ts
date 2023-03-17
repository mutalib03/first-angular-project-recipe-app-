import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Auth/auth.guard';
import { SharedModule } from '../shared/shared.module';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes-resolver.service';

import { RecipesComponent } from './recipes.component';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeItemComponent,
  ],
 imports: [RouterModule, SharedModule, ReactiveFormsModule, RouterModule.forChild([
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
 ])
],
  exports: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipeItemComponent,

  ]
})
export class RecipesModule {}
