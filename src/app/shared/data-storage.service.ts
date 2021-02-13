import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";

import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    private URL = 'https://recipe-book-591ec-default-rtdb.europe-west1.firebasedatabase.app/';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put(this.URL + 'recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        this.http.get<Recipe[]>(this.URL + 'recipes.json')
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes)
            })
    }
}