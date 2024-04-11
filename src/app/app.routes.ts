import { Routes } from '@angular/router';
import { IngredientListComponent } from './modules/ingredient-list/ingredient-list.component';
import { RecipeComponent } from './modules/recipe/recipe.component';
import { SubmitIngredientComponent } from './modules/submit-ingredient/submit-ingredient.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { IngredientComponent } from './modules/ingredient/ingredient.component';
import { BookmarksComponent } from './modules/bookmarks/bookmarks.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipe-list' },
  { path: 'ingredient-list', component: IngredientListComponent },
  { path: 'recipe-list', component: RecipeComponent },
  { path: 'submit-ingredients', component: SubmitIngredientComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'ingredient/:ingredientId', component: IngredientComponent },
  { path: 'bookmarks', component: BookmarksComponent },
  { path: '**', component: PageNotFoundComponent },
];
