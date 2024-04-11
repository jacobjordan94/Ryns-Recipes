import { Component, HostListener, Input, OnInit } from "@angular/core";
import { Category, Ingredient, SubCategory } from "../../services/ingredients/ingredients.interface";
import { Observable } from "rxjs";
import { IngredientsService } from "../../services/ingredients/ingredients.service";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
    selector: 'app-ingredient-card',
    standalone: true,
    imports: [ NgIf, AsyncPipe ],
    template: `
        <div class="ingredient-card card" [class.shadow]="hovering && hoverable" [class.hover]="hovering && hoverable">
            <div class="card-body">
                <h5 class="card-title">{{ ingredient.name }}</h5>
                <h6 *ngIf="category$ | async as cat" class="card-subtitle mb-2 text-muted">
                    {{ cat.name }} <span *ngIf="subCategory$ | async as sub">&bull; {{ sub.name }}</span>
                </h6>
                <p class="card-text">...</p>
            </div>
        </div>
    `,
    styles: [
        '.ingredient-card { transition: 250ms ease-in-out; }',
        '.ingredient-card.hover { cursor: pointer; transform: scale(1.015); }'
    ]
})
export class AppIngredientCard implements OnInit {

    public hovering = false;
    @HostListener('mouseenter') 
    mouseenter() {
        this.hovering = true;
    }
    @HostListener('mouseleave')
    mouseleave() {
        this.hovering = false;
    }

    @Input() public ingredient!: Ingredient;
    @Input() public hoverable = false;

    category$!: Observable<Category | undefined>;
    subCategory$!: Observable<SubCategory | undefined>;

    constructor(private _is: IngredientsService) {}

    ngOnInit(): void {
        this.category$ = this._is.getCategory(this.ingredient.categoryID);
        this.subCategory$ = this._is.getSubCategoryById(this.ingredient.subCategoryId);    
    }

}