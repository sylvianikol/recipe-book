import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Volcano', 'Chocolate cake', 'https://i2.wp.com/pixahive.com/wp-content/uploads/2020/10/Chocolate-cake-120286-pixahive.jpg'),
    new Recipe('Strawberry Shortcake', 'Strawberry Shortcake Cake has all the flavors we love in a delicious shortcake, but in cake form!', 'https://www.savingdessert.com/wp-content/uploads/2019/05/Strawberry-Shortcake-Cake-2.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

}
