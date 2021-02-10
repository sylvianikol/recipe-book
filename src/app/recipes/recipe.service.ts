import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Volcano', 
        'Chocolate cake', 
        'https://i2.wp.com/pixahive.com/wp-content/uploads/2020/10/Chocolate-cake-120286-pixahive.jpg', 
        [
            new Ingredient('Cacao', 1),
            new Ingredient('Flour', 1),
            new Ingredient('Sugar', 2)
        ]),
        new Recipe('Strawberry Shortcake', 
        'Strawberry Shortcake Cake has all the flavors we love in a delicious shortcake, but in cake form!', 
        'https://www.savingdessert.com/wp-content/uploads/2019/05/Strawberry-Shortcake-Cake-2.jpg', 
        [
            new Ingredient('Strawberry', 1),
            new Ingredient('Milk', 1),
            new Ingredient('Eggs', 2)
        ])
      ];

      constructor(private shoppingListService: ShoppingListService) {}

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
}