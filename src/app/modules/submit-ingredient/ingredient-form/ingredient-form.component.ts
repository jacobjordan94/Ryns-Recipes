import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, NewIngredient, SubCategory } from '../../../core/services/ingredients/ingredients.interface';
import { IngredientsService } from '../../../core/services/ingredients/ingredients.service';
import { Observable, startWith, switchMap, tap } from 'rxjs';
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
    categoryID: new FormControl(0),
    subCategoryId: new FormControl(0),
    name: new FormControl('', [ Validators.required ])
  });

  categories$: Observable<Category[]>;
  subCategories$!: Observable<SubCategory[] | undefined>;

  private get _categoryIdForm(): FormControl<number> {
    return this.form.get('categoryID') as FormControl<number>;
  }
  private get _subCategoryIdForm(): FormControl<number | undefined> {
    return this.form.get('subCategoryId') as FormControl<number | undefined>;
  }
  private get _categoryId(): number {
    return this._categoryIdForm?.value;
  }
  private get _subCategoryId(): number | undefined {
    return this._subCategoryIdForm?.value;
  }
  
  constructor(private _is: IngredientsService) { 
    this.categories$ = this._is.categories$;
    this.subCategories$ = this._categoryIdForm.valueChanges.pipe(
      startWith(this._categoryId),
      switchMap(categoryId => this._is.getSubCategoriesByCategoryId(categoryId)),
      tap(subCategories => {
        if(subCategories.length === 0) {
          this._subCategoryIdForm.patchValue(undefined);
          this._subCategoryIdForm.disable();
        } else {
          this._subCategoryIdForm.patchValue(0);
          this._subCategoryIdForm.enable();
        }
      }),
    );
  }

  public onSubmit(): void {
    const data = this.form.getRawValue() as NewIngredient;
    this._is.addIngredient(data);
    this.form.patchValue({
      categoryId: 0,
      subCategoryId: 0,
      name: '', 
    });
  }
}
