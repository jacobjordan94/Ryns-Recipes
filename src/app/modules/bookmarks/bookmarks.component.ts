import { Component } from "@angular/core";
import { BookmarksService } from "../../core/services/bookmarks/bookmarks.service";
import { Observable } from "rxjs";
import { Ingredient } from "../../core/services/ingredients/ingredients.interface";
import { AppIngredientCard } from "../../core/components/ingredient-card/ingredient-card";
import { AsyncPipe, NgFor } from "@angular/common";
import { RouterLink } from "@angular/router";
import { AppIngredientListComponent } from "../../core/components/ingredient-list/ingredient-list.component";

@Component({
    selector: 'app-bookmarks',
    imports: [ AppIngredientListComponent, AppIngredientCard, NgFor, RouterLink, AsyncPipe ],
    standalone: true,
    templateUrl: './bookmarks.component.html',
})
export class BookmarksComponent {

    public bookmarkedIngredients$: Observable<Ingredient[]> = this._bs.bookmarkedIngredients$;

    constructor(private _bs: BookmarksService) {}
}