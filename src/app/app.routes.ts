import { Routes } from '@angular/router';
import { IngredientListComponent } from './modules/ingredient-list/ingredient-list.component';
import { RecipeComponent } from './modules/recipe/recipe.component';
import { SubmitIngredientComponent } from './modules/submit-ingredient/submit-ingredient.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipe-list' },
  { path: 'ingredient-list', component: IngredientListComponent },
  { path: 'recipe-list', component: RecipeComponent },
  { path: 'submit-ingredients', component: SubmitIngredientComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];
