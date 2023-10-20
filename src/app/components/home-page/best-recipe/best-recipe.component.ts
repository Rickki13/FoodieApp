import { Component } from '@angular/core';
import {DataService} from "../../../data.service";
import {ToastrService} from "ngx-toastr";
import {Store} from "@ngxs/store";
import {Posts} from "../../../interfaces/posts.interface";
import {FavoriteUpdate} from "../../../store/model/favorite.model";
import {FavoriteState} from "../../../store/favorite.state";

@Component({
  selector: 'app-best-recipe',
  templateUrl: './best-recipe.component.html',
  styleUrls: ['./best-recipe.component.css']
})
export class BestRecipeComponent {
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private store: Store
  ) {}

  bestRecipes!: Posts[];
  bestRecipesSliced!: Posts[];
  favoriteRecipes!: number[];

  favoriteUpdate(_id: number) {
    this.store.dispatch(new FavoriteUpdate(_id));
    if (this.favoriteRecipes.includes(_id))
      this.toastr.success(
        'Добавлено в избранное',
        'Сохранили этот рецепт для вас'
      );
  }

  ngOnInit() {
    this.dataService.getAllPosts().subscribe({
      next: (value) => {
        this.bestRecipes = value;
        const shuffled = Array.from(this.bestRecipes).sort(
          () => 0.5 - Math.random()
        );
        this.bestRecipes = shuffled.slice(0, 6);
        this.bestRecipesSliced = this.bestRecipes.slice(0, 3);
      },
    });

    this.store.select(FavoriteState.getFavorite).subscribe({
      next: (favorites) => (this.favoriteRecipes = favorites),
    });
  }
}
