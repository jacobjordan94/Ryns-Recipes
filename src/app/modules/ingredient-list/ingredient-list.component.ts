import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../core/services/ingredients/ingredients.interface';
import { IngredientsService } from '../../core/services/ingredients/ingredients.service';
import { IngredientDetailsComponent } from './ingredient-details/ingredient-details.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [CommonModule, IngredientDetailsComponent],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})

export class IngredientListComponent {
  public category$: Observable<Category[]> = this._is.categories$;

  constructor(private _is: IngredientsService) { }

  public selectedCategoryID!: number;
  
  onSelect(categoryId: any): void {
    categoryId = parseFloat(categoryId);
    this.selectedCategoryID = categoryId;
  }

}

