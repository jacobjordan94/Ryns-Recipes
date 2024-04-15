import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, map, Observable } from "rxjs";
import { WikipediaImagesResponse, WikipediaSearchItem, WikipediaSearchResponse } from "./wikipedia.interface";

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

    public search(searchTerm: string): Observable<WikipediaSearchItem[]> {
        if(!searchTerm || searchTerm === '') return of([]);
        const params = new HttpParams(DEFAULT_PARAMS)
            .set('action', 'query')
            .set('list', 'search')
            .set('srsearch', searchTerm);
        return this._http.get<WikipediaSearchResponse>(BASE_URL, { params })
            .pipe(
                map(resp => resp.query.search),
                map(searchItems => searchItems.filter(si => !(si.title.includes('(disambiguation)')))),
                map(searchItems => this._removeHtmlFromDescription(searchItems))
            );
    }

    public getImages(title: string): Observable<string[]> {
        const params = new HttpParams(DEFAULT_PARAMS)
            .set('action', 'query')
            .set('titles', title)
            .set('prop', 'images');
        return this._http.get<WikipediaImagesResponse>(BASE_URL, { params })
            .pipe(
                map(resp => Object.values(resp.query.pages).at(0)?.images || []),
                map(rawImages => rawImages.map(ri => `https://en.wikipedia.org/w/index.php?title=Special:Redirect/file/${ri.title}`)),
            );
    }

    private _removeHtmlFromDescription(items: WikipediaSearchItem[]): WikipediaSearchItem[] {
        return items.map(item => {
            item.snippet = item.snippet.replace(/<\/?[^>]+(>|$)/g, '');
            return item;
        });
    }

}