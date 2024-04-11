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
    templateUrl: './ingredient-card.component.html',
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