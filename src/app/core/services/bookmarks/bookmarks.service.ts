import { Injectable } from "@angular/core";
import { IngredientsService } from "../ingredients/ingredients.service";
import { BehaviorSubject, Observable, combineLatest, map } from "rxjs";
import { Ingredient } from "../ingredients/ingredients.interface";

@Injectable({ providedIn: 'root' })
export class BookmarksService {

    private _bookmarkedIngredientsIds$: BehaviorSubject<number[]> = new BehaviorSubject([2]);
    public bookmarkedIngredientsIds$: Observable<number[]> = this._bookmarkedIngredientsIds$.asObservable();
    public bookmarkedIngredients$: Observable<Ingredient[]> = combineLatest([this._bookmarkedIngredientsIds$, this._is.ingredient$])
        .pipe(
            map(([bookmarkedIds, allIgredients]) => {
                return allIgredients.filter(ingredient => bookmarkedIds.includes(ingredient.id))
            })
        );

    constructor(private _is: IngredientsService) {}

    public addIngredient(ingredientId: number) {
        const ids = this._bookmarkedIngredientsIds$.getValue();
        this._bookmarkedIngredientsIds$.next([...ids, ingredientId]);
    }

    public removeIngredient(ingredientId: number) {
        const ingredients = this._bookmarkedIngredientsIds$.getValue();
        const index = ingredients.findIndex(ingId => ingId === ingredientId);
        ingredients.splice(index, 1);
        this._bookmarkedIngredientsIds$.next([...ingredients]);
    }

    public isBookmarkedIngredient(ingredientId: number): Observable<boolean> {
        return this._bookmarkedIngredientsIds$.pipe(
            map(ids => ids.includes(ingredientId))
        );
    }

    public toggleIngredient(ingredientId: number) {
        const ingredientIds = this._bookmarkedIngredientsIds$.getValue();
        if(ingredientIds.includes(ingredientId)) {
            this.removeIngredient(ingredientId);
        } else {
            this.addIngredient(ingredientId);
        }
    }
}