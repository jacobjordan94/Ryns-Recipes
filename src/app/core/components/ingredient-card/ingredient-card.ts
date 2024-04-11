import { Component, HostListener, Input, OnInit } from "@angular/core";
import { Category, Ingredient, SubCategory } from "../../services/ingredients/ingredients.interface";
import { Observable, map } from "rxjs";
import { IngredientsService } from "../../services/ingredients/ingredients.service";
import { AsyncPipe, NgClass, NgIf } from "@angular/common";
import { BookmarksService } from "../../services/bookmarks/bookmarks.service";
import { CategoryNamePipe } from "../../pipes/category-name/category-name.pipe";

@Component({
    selector: 'app-ingredient-card',
    standalone: true,
    imports: [ NgIf, AsyncPipe, NgClass, CategoryNamePipe ],
    templateUrl: './ingredient-card.component.html',
    styles: [
        '.ingredient-card { transition: 250ms ease-in-out; position: relative; }',
        '.ingredient-card.hover, .btn-bookmark:hover { cursor: pointer; transform: scale(1.015); }',
        '.card-img-top { object-fit: cover; }',
        '.btn { width: min-content; }',
        '.btn-bookmark { position: absolute; top: 12px; left: 12px; }'
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
    @Input() public showBookmark = false;

    category$!: Observable<Category | undefined>;
    hasSubCategory$!: Observable<boolean>;
    isBookmarked$!: Observable<boolean>;

    constructor(
        private _is: IngredientsService, 
        private _bs: BookmarksService
    ) {}

    ngOnInit(): void {
        this.category$ = this._is.getCategory(this.ingredient.categoryID);
        this.hasSubCategory$ = this._is.getSubCategoryById(this.ingredient.subCategoryId).pipe(map(Boolean));
        this.isBookmarked$ = this._bs.isBookmarkedIngredient(this.ingredient.id);
    }

    toggleBookmark(event: MouseEvent) {
        event.stopPropagation();
        this._bs.toggleIngredient(this.ingredient.id);
    }

}