import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Volcano', 'Chocolate cake', 'https://i2.wp.com/pixahive.com/wp-content/uploads/2020/10/Chocolate-cake-120286-pixahive.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
