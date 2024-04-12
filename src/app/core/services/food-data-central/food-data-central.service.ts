import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { FoodDataCentralFood, FoodDataCentralReponse } from './food-data-central.interface';
import { environment } from '../../../environment';

const BASE_URL = environment.foodDataCentralAPIBaseURL;

@Injectable({
  providedIn: 'root',
})
export class FoodDataCentralService {

  constructor(private _http: HttpClient) { }

  search(searchTerm: string): Observable<FoodDataCentralFood[]> {
    const URL = BASE_URL + 'foods/search';
    const params = new HttpParams().set('query', searchTerm)
      // @ts-ignore
      .set('dataType', ['Foundation'])
    return this._http.get<FoodDataCentralReponse>(URL, { params })
      .pipe(
        tap(console.log),
        map(fdcr => fdcr.foods)
      );
  }

}
