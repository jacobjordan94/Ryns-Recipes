import { Component, Input, OnInit } from "@angular/core";
import { IngredientsService } from "../../services/ingredients/ingredients.service";
import { Observable, map } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'app-category-name',
    imports: [ AsyncPipe ],
    template: '{{ name$ | async }}',
    standalone: true,
})
export class AppCategoryNameComponent implements OnInit {
    
    @Input() id!: number;
    name$!: Observable<string>;

    constructor(private _is: IngredientsService){}

    ngOnInit(): void {
        this.name$ = this._is.getCategory(this.id).pipe(
            map(category => category ? category.name : '')
        );
    }
}