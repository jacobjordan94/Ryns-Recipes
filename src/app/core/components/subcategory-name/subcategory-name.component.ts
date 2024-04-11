import { Component, Input, OnInit } from "@angular/core";
import { IngredientsService } from "../../services/ingredients/ingredients.service";
import { Observable, map } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'app-subcategory-name',
    imports: [ AsyncPipe ],
    template: '{{ name$ | async }}',
    standalone: true,
})
export class AppSubCategoryNameComponent implements OnInit {
    
    @Input() id!: number | undefined;
    name$!: Observable<string>;

    constructor(private _is: IngredientsService){}

    ngOnInit(): void {
        this.name$ = this._is.getSubCategoryById(this.id).pipe(
            map(sub => sub ? sub.name : '')
        );
    }
}