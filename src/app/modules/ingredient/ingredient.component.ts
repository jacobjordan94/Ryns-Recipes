import { Component } from "@angular/core";
import { IngredientsService } from "../../core/services/ingredients/ingredients.service";
import { Observable, map, switchMap, tap } from "rxjs";
import { Ingredient } from "../../core/services/ingredients/ingredients.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { AsyncPipe, NgIf } from "@angular/common";
import { AppCategoryNameComponent } from "../../core/components/category-name/category-name.component";
import { AppSubCategoryNameComponent } from "../../core/components/subcategory-name/subcategory-name.component";

@Component({
    standalone: true,
    imports: [ AsyncPipe, NgIf, AppCategoryNameComponent, AppSubCategoryNameComponent ],
    templateUrl: './ingredient.component.html',
})
export class IngredientComponent {

    public ingredient$!: Observable<Ingredient | undefined>;
    public hasSubCategory$!: Observable<boolean>;

    constructor(private _is: IngredientsService, private _route: ActivatedRoute, private _router: Router) {
        this.ingredient$ = this._route.params.pipe(
            map(params => params['ingredientId']),
            switchMap(id => this._is.getIngredient(Number(id))),
            tap(ingredient => {
                if(!ingredient) this._router.navigate(['/page-not-found'], { skipLocationChange: true });
            })
        );
        this.hasSubCategory$ = this.ingredient$.pipe(
            switchMap(ingredient => this._is.getSubCategoryById(ingredient?.subCategoryId)),
            map(Boolean)
        );
    }
}