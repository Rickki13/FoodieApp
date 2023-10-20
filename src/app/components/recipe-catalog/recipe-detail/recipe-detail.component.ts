import { Component } from '@angular/core';
import {DataService} from "../../../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Meta} from "@angular/platform-browser";
import {Store} from "@ngxs/store";
import {OneRecipe} from "../../../interfaces/recipe.interface";
import {Posts} from "../../../interfaces/posts.interface";
import {RecipeState} from "../../../store/recipe.state";
import {RecipeIngredientsUpdate, RecipeStepsUpdate} from "../../../store/model/recipe.model";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  constructor(
    private dataService: DataService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private store: Store
  ) {}

  recipeId: number = 1;
  recipeInfo!: OneRecipe;
  randomRecipes!: Posts[];

  recipeIngredients: string[] = [];
  recipeSteps: string[] = [];

  ngOnInit() {
    this.activatedRouter.params.subscribe({
      next: (params) => {
        this.recipeId = params['id'];
      },
    });

    this.dataService.getRecipe(this.recipeId).subscribe({
      next: (recipe) => {
        this.recipeInfo = recipe;
        this.meta.updateTag({
          name: 'description',
          content: this.recipeInfo.body,
        });
        this.meta.updateTag({
          name: 'title',
          content: this.recipeInfo.title,
        });
        this.meta.updateTag({
          name: 'image',
          content: this.recipeInfo.image,
        });
      },
    });

    this.dataService.getAllPosts().subscribe({
      next: (value) => {
        this.randomRecipes = value;

        const shuffled = Array.from(this.randomRecipes).sort(
          () => 0.5 - Math.random()
        );
        this.randomRecipes = shuffled.slice(0, 3);
      },
    });

    this.store.select(RecipeState.getRecipe).subscribe({
      next: (ingredient) => (this.recipeIngredients = ingredient)
    });

    this.store.select(RecipeState.getRecipe).subscribe({
      next: (steps) => (this.recipeSteps = steps)
    });
  }

  recipeIngUpdate(recipeIng: string) {
    this.store.dispatch(new RecipeIngredientsUpdate(recipeIng));
  }

  recipeStepUpdate(recipeIng: string) {
    this.store.dispatch(new RecipeStepsUpdate(recipeIng));
  }

  redirectTo(url: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }

  printThisPage() {
    window.print();
  }
}
