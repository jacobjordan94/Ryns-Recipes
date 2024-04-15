import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, map, Observable } from "rxjs";
import { WikipediaSearchResponse } from "./wikipedia.interface";

const BASE_URL = 'https://en.wikipedia.org/w/api.php';
const DEFAULT_PARAMS = {
    fromObject: {
        format: 'json',
        origin: '*',
    },
};

@Injectable({ providedIn: 'root' })
export class WikipediaService {
    constructor(private _http: HttpClient) {}

    public search(searchTerm: string): Observable<string[]> {
        if(!searchTerm || searchTerm === '') return of([]);
        const params = new HttpParams(DEFAULT_PARAMS)
            .set('action', 'opensearch')    
            .set('search', searchTerm);
        return this._http.get<WikipediaSearchResponse>(BASE_URL, { params })
            .pipe(
                map(resp => resp[1] || [])
            );
    }
}