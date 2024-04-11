import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';

@Component({
  selector: 'app-submit-ingredient',
  standalone: true,
  imports: [CommonModule, IngredientFormComponent, AsyncPipe],
  templateUrl: './submit-ingredient.component.html',
  styleUrl: './submit-ingredient.component.scss',
})
export class SubmitIngredientComponent {

  public ingredients$ = this._is.ingredient$;

  constructor(private _is: IngredientsService) {}

}


