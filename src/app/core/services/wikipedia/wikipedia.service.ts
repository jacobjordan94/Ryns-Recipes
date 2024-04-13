import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

const BASE_URL = 'https://en.wikipedia.org/w/api.php';
const DEFAULT_PARAMS = {
    fromObject: {
        action: 'opensearch',
        format: 'json',
        origin: '*',
    },
};

@Injectable({ providedIn: 'root' })
export class WikipediaService {
    constructor(private _http: HttpClient) {}

    public search(searchTerm: string) {
        if(!searchTerm || searchTerm === '') return of([]);
        const params = new HttpParams(DEFAULT_PARAMS).set('search', searchTerm);
        return this._http.get(BASE_URL, { params });
    }
}