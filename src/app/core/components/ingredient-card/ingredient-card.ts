import { Component, HostListener, Input, OnInit } from "@angular/core";
import { Category, Ingredient, SubCategory } from "../../services/ingredients/ingredients.interface";
import { Observable, map } from "rxjs";
import { IngredientsService } from "../../services/ingredients/ingredients.service";
import { AsyncPipe, NgIf } from "@angular/common";
import { AppCategoryNameComponent } from "../category-name/category-name.component";
import { AppSubCategoryNameComponent } from "../subcategory-name/subcategory-name.component";

@Component({
    selector: 'app-ingredient-card',
    standalone: true,
    imports: [ NgIf, AsyncPipe, AppCategoryNameComponent, AppSubCategoryNameComponent ],
    template: `
        <div class="ingredient-card card" [class.shadow]="hovering && hoverable" [class.hover]="hovering && hoverable">
        <img *ngIf="ingredient.image" class="card-img-top" [src]="ingredient.image" height="128">
            <div class="card-body">
                <h5 class="card-title">{{ ingredient.name }}</h5>
                <h6 *ngIf="category$ | async as cat" class="card-subtitle mb-2 text-muted">
                    <app-category-name [id]="ingredient.categoryID"></app-category-name>
                    <ng-container *ngIf="hasSubCategory$ | async">
                        <span class="ms-1 me-1">&bull;</span>
                        <app-subcategory-name [id]="ingredient.subCategoryId"></app-subcategory-name>
                    </ng-container>
                </h6>
                <p class="card-text">...</p>
            </div>
        </div>
    `,
    styles: [
        '.ingredient-card { transition: 250ms ease-in-out; }',
        '.ingredient-card.hover { cursor: pointer; transform: scale(1.015); }',
        '.card-img-top { object-fit: cover; }'
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
    hasSubCategory$!: Observable<boolean>;

    constructor(private _is: IngredientsService) {}

    ngOnInit(): void {
        this.category$ = this._is.getCategory(this.ingredient.categoryID);
        this.hasSubCategory$ = this._is.getSubCategoryById(this.ingredient.subCategoryId).pipe(map(Boolean));
    }

}