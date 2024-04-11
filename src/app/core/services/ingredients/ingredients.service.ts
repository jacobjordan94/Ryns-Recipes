import { Injectable } from "@angular/core";
import { CATEGORIES, INGREDIENTS, SUBCATEGORIES } from "./ingredients.data";
import { Category, Ingredient, NewIngredient, SubCategory } from "./ingredients.interface";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class IngredientsService {

    private _ingredients$: BehaviorSubject<Ingredient[]> = new BehaviorSubject(INGREDIENTS);
    public ingredient$: Observable<Ingredient[]> = this._ingredients$.asObservable();
    private _categories$: BehaviorSubject<Category[]> = new BehaviorSubject(CATEGORIES);
    public categories$: Observable<Category[]> = this._categories$.asObservable();
    private _subCategories$: BehaviorSubject<SubCategory[]> = new BehaviorSubject(SUBCATEGORIES);
    public subCategories$: Observable<Ingredient[]> = this._subCategories$.asObservable();

    constructor() { }

    public getIngredient(id: number): Observable<Ingredient | undefined> {
        return this.ingredient$.pipe(
            map(ingredients => ingredients.filter(ingredient => ingredient.id === id).at(0))
        );
    }

    public getCategory(id: number): Observable<Category | undefined> {
        return this.categories$.pipe(
            map(categories => categories.filter(category => category.id === id).at(0))
        );
    }

    public getCategorySync(id: number): Category | undefined {
        const categories = this._categories$.getValue();
        return categories.filter(category => category.id === id).at(0);
    }

    public getIngredientByCategory(categoryId: number): Observable<Ingredient[]> {
        return this.ingredient$.pipe(
            map(ingredients => ingredients.filter(ingredient => ingredient.categoryID === categoryId))
        );
    }

    public getSubCategoriesByCategoryId(categoryId: number): Observable<SubCategory[]> {
        return this.subCategories$.pipe(
            map(subCategories => subCategories.filter(sub => sub.categoryID === categoryId))
        );
    }

    public getSubCategoryById(id: number = -1): Observable<SubCategory | undefined> {
        return this.subCategories$.pipe(
            map(subCategories => subCategories.filter(sub => sub.id === id).at(0)),
        );
    }

    public getSubCategoryByIdSync(id: number = -1): SubCategory | undefined {
        const subCategories = this._subCategories$.getValue();
        return subCategories.filter(sub => sub.id === id).at(0)
    }

    public addIngredient(newIngredient: NewIngredient): void {
        if(typeof newIngredient.subCategoryId === undefined) {
            delete newIngredient.subCategoryId;
        }
        const currentIngredients = this._ingredients$.getValue();
        const lastIngredient = currentIngredients.sort((a, b) => a.id - b.id).at(-1);
        const newId = lastIngredient ? (lastIngredient.id + 1) : 0;

        const ingredient = Object.assign(newIngredient, { id: newId });
        this._ingredients$.next([ ingredient, ...currentIngredients, ]);
    }
}