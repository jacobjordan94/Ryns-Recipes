import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

type HeaderLink = {
    name: string, link: string, active?: string | string[];
};

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [ RouterLink, RouterLinkActive, NgFor ],
    template: `
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary c-light ps-3 pe-3">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a *ngFor="let link of links" class="nav-item nav-link" href="#" [routerLinkActive]="link?.active || 'active'" [routerLink]="link.link">{{ link.name }}</a>
                </div>
            </div>
        </nav>
    `,
})
export class AppHeader {
    public links: HeaderLink[] = [
        { name: 'Recipes', link: '/recipe-list' },
        { name: 'Submit Ingredients', link: '/submit-ingredients' },
        { name: 'Ingredient List', link: '/ingredient-list' },
        { name: 'Page Not Found', link: '/page-not-found' },
    ];
    
    constructor() {}
}