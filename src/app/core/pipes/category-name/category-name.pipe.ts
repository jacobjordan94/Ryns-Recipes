import { Pipe, PipeTransform, inject } from '@angular/core';
import { IngredientsService } from '../../services/ingredients/ingredients.service';

@Pipe({
  name: 'categoryName',
  standalone: true
})
export class CategoryNamePipe implements PipeTransform  {

  constructor(private _is: IngredientsService){}

  transform(value: number | undefined, ...args: string[]): string | void {
    if(value === undefined) return;
    if(args.length && args.includes('sub')) return this._is.getSubCategoryByIdSync(value)?.name || '';
    return this._is.getCategorySync(value)?.name || '';
  }
}