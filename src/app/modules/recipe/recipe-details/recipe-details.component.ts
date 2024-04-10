import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Recipe } from '../../../core/services/recipes/recipes.interface';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../../../core/services/recipes/recipes.service';
import { IngredientsService } from '../../../core/services/ingredients/ingredients.service';
import { Ingredient } from '../../../core/services/ingredients/ingredients.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})
export class RecipeDetailsComponent implements OnChanges {
  @Input() id!: number;

  public recipe!: Recipe | undefined;

  constructor(
    private _rs: RecipesService, 
    private _is: IngredientsService
  ) {}

  ngOnChanges(): void {
    this.recipe = this._rs.getRecipe(this.id);
  }

  public getIngredient(id: number): Observable<Ingredient | undefined> {
    return this._is.getIngredient(id);
  }
}
