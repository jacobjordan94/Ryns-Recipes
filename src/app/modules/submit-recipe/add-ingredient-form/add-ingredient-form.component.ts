import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { IngredientsService } from '../../../core/services/ingredients/ingredients.service';
import { combineLatest, Observable, shareReplay, startWith, switchMap, take, tap } from 'rxjs';
import { Category, Ingredient, SubCategory } from '../../../core/services/ingredients/ingredients.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IngredientFormComponent } from '../../submit-ingredient/ingredient-form/ingredient-form.component';

@Component({
  selector: 'app-add-ingredient-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule, IngredientFormComponent, FormsModule],
  templateUrl: './add-ingredient-form.component.html',
  styleUrl: './add-ingredient-form.component.scss'
})
export class AddIngredientFormComponent {
  categories$: Observable<Category[]>;
  subcategory$!: Observable<SubCategory[] | undefined>;
  ingredients$!: Observable<Ingredient[] | undefined>;
  selectedIngredient: (Ingredient | undefined);

  public addIngredientForm: FormGroup = new FormGroup({
    categoryId: new FormControl(0, [Validators.required, Validators.min(0)]),
    subCategoryId: new FormControl(-1, [Validators.required, Validators.min(0)]),
    ingredient: new FormControl(-1, [ Validators.required, Validators.min(0) ]),
  })

  public get categoryIdForm(): FormControl<number> {
    return this.addIngredientForm.get('categoryId') as FormControl<number>;
  }

  public get subCategoryIdForm(): FormControl<number | undefined> {
    return this.addIngredientForm.get('subCategoryId') as FormControl<number>;
  }

  private get _ingredientForm(): FormControl<number | undefined> {
    return this.addIngredientForm.get('ingredient') as FormControl<number>;
  }

  constructor(private _is: IngredientsService) {
    this.categories$ = this._is.categories$.pipe(take(1));
    this.subcategory$ = this.addIngredientForm.get('categoryId')!.valueChanges.pipe(
      startWith(this.categoryIdForm.value),
      switchMap(categoryId => this._is.getSubCategoryByCategory(categoryId)),
    )

    this.ingredients$ = combineLatest([
      this.categoryIdForm.valueChanges.pipe(startWith(this.categoryIdForm.value)),
      this.subCategoryIdForm.valueChanges.pipe(startWith(this.subCategoryIdForm.value))
    ]).pipe(
      switchMap(([categoryId, subCategoryId]) => this._is.getIngredientById(categoryId, subCategoryId)),
    );

    this.categoryIdForm.valueChanges.subscribe(_catId => {
      this.subCategoryIdForm.patchValue(-1);
      this.subCategoryIdForm.enable();
      this._ingredientForm.patchValue(-1);
      this._ingredientForm.disable();
    });

    this.subCategoryIdForm.valueChanges.subscribe(() => {
      this._ingredientForm.patchValue(-1);
      this._ingredientForm.enable();
    });

    this._ingredientForm.disable();

  };

  @Output() public onSubmit: EventEmitter<number> = new EventEmitter();

  submit(): void {
    if(!this.addIngredientForm.valid) return;
    this.onSubmit.emit(this.addIngredientForm.value['ingredient']);
  }
  
}
