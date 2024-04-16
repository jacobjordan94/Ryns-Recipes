import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, NewIngredient, SubCategory } from '../../../core/services/ingredients/ingredients.interface';
import { IngredientsService } from '../../../core/services/ingredients/ingredients.service';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, startWith, switchMap, tap, BehaviorSubject, of } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NgbCollapseModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { WikipediaService } from '../../../core/services/wikipedia/wikipedia.service';
import { WikipediaSearchItem } from '../../../core/services/wikipedia/wikipedia.interface';
import { WikiImgSelectorComponent } from '../../../core/components/wiki-img-selector/wiki-img-selector.component';

@Component({
  selector: 'app-ingredient-form',
  standalone: true,
  imports: [ ReactiveFormsModule, AsyncPipe, NgFor, NgbTypeaheadModule, NgIf, NgbCollapseModule , WikiImgSelectorComponent ],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.scss'
})
export class IngredientFormComponent {

  public form: FormGroup = new FormGroup({
    categoryID: new FormControl(0),
    subCategoryId: new FormControl(0),
    name: new FormControl('', [ Validators.required ]),
    image: new FormControl(''),
    description: new FormControl(''),
  });
  
  private _images$: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);
  public images$: Observable<string[]> = this._images$.asObservable();

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

  public nameFormatter = (wikiItem: WikipediaSearchItem) => wikiItem.title;
  
  @Output() public onSubmit: EventEmitter<NewIngredient> = new EventEmitter();
  
  constructor(private _is: IngredientsService, private _ws: WikipediaService) { 
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

  public submit(): void {
    const data = this.form.getRawValue() as NewIngredient;
    //  @ts-ignore - name is being sent as an object; something to do with typeahead module, dumb fix
    data.name = data.name.title;
    this.onSubmit.emit(data);
    this.form.patchValue({
      categoryId: 0,
      subCategoryId: 0,
      name: '', 
      image: '',
      description: '',
    });
    this._images$.next([]);
  }

  public seachWiki: OperatorFunction<string, readonly WikipediaSearchItem[]> = (searchTerm$: Observable<string>) =>
    searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => this._ws.search(searchTerm)),
  );

  public ingredientSelected(event: {item: WikipediaSearchItem}) {
    const sentences = event.item.snippet.split('.');
    const description = sentences.length === 1 ? sentences.at(0) : (sentences.at(0) + '.');
    const patch: any = {
      description,
      name: event.item.title,
    };
    this.form.patchValue(patch);
    this._ws.getImages(event.item.title).subscribe(images => {
      if(images.length) {
        this._images$.next(images);
      }
    });
  }

  private _loadImage(image: string): Observable<boolean> {
    return new Observable(subscriber => {
      let img = new Image();
      img.onload = function() {
        subscriber.next(true);
        subscriber.complete();
      };
      img.onerror = function() {
        subscriber.error(false)
      };
      img.src = image;
    });
  }
}
