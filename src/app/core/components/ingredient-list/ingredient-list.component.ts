import { Component } from "@angular/core";

@Component({
    selector: 'app-ingredient-list',
    standalone: true,
    styleUrl: './ingredient-list.component.scss',
    template: `
        <div class="ingredients-list-container d-flex gap-2 flex-wrap">
            <ng-content></ng-content>
        </div>
    `,
})
export class AppIngredientListComponent {
    constructor(){}
}