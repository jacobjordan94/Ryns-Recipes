import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, SubCategory } from '../../../core/services/ingredients/ingredients.interface';
import { IngredientsService } from '../../../core/services/ingredients/ingredients.service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-ingredient-form',
  standalone: true,
  imports: [ ReactiveFormsModule, AsyncPipe, NgFor ],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.scss'
})
export class IngredientFormComponent {

  public form: FormGroup = new FormGroup({
    categoryId: new FormControl(0),
    subCategoryId: new FormControl(0),
    ingredientName: new FormControl('', [ Validators.required ])
  });

  categories$: Observable<Category[]>;
  subCategories$!: Observable<SubCategory[]>;

  private get _subCategoryId(): number {
    return this.form.get('subCategoryId')?.value;
  }
  private get _categoryId(): number {
    return this.form.get('categoryId')?.value;
  }
  
  constructor(private _is: IngredientsService) { 
    this.categories$ = this._is.categories$;
    this.updateSubCategory(this._subCategoryId);
  }

  public updateSubCategory(categoryId: number = this._categoryId): void {
    this.form.get('subCategoryId')?.patchValue(null);
    this.subCategories$ = this._is.getSubCategoriesByCategoryId(Number(categoryId))
      .pipe(
        tap(subCategories => {
          if(subCategories.length === 0) {
            this.form.get('subCategoryId')?.patchValue(undefined);
            this.form.get('subCategoryId')?.disable();
          } else {
            this.form.get('subCategoryId')?.patchValue(1);
            this.form.get('subCategoryId')?.enable();
          }
        }),
      );
  }

  public onSubmit(): void {
    const data = this.form.getRawValue();
    console.log(Object.assign({}, data));
  }
}
