import { Component, Input, OnInit } from "@angular/core";
import { Category, Ingredient, SubCategory } from "../../services/ingredients/ingredients.interface";
import { Observable, tap } from "rxjs";
import { IngredientsService } from "../../services/ingredients/ingredients.service";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
    selector: 'app-ingredient-card',
    standalone: true,
    imports: [ NgIf, AsyncPipe ],
    template: `
        <div class="ingredient-card card">
            <div class="card-body">
                <h5 class="card-title">{{ ingredient.name }}</h5>
                <h6 *ngIf="category$ | async as cat" class="card-subtitle mb-2 text-mutest">
                    {{ cat.name }} <span *ngIf="subCategory$ | async as sub">&bull; {{ sub.name }}</span>
                </h6>
                <p class="card-text">...</p>
            </div>
        </div>
    `,
})
export class AppIngredientCard implements OnInit {

    @Input() public ingredient!: Ingredient;

    category$!: Observable<Category | undefined>;
    subCategory$!: Observable<SubCategory | undefined>;

    constructor(private _is: IngredientsService) {}

    ngOnInit(): void {
        console.log(this.ingredient);
        this.category$ = this._is.getCategory(this.ingredient.categoryID);
        this.subCategory$ = this._is.getSubCategoryById(this.ingredient.subCategoryId);    
    }

}