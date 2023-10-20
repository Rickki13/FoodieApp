import { Component } from '@angular/core';
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Meta} from "@angular/platform-browser";
import {Store} from "@ngxs/store";
import {Posts} from "../../../interfaces/posts.interface";
import {FavoriteUpdate} from "../../../store/model/favorite.model";
import {FavoriteState} from "../../../store/favorite.state";

@Component({
  selector: 'app-try-recipe',
  templateUrl: './try-recipe.component.html',
  styleUrls: ['./try-recipe.component.css']
})
export class TryRecipeComponent {
  constructor(
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
    private meta: Meta,
    private store: Store
  ) {}

  randomRecipes!: Posts[];
  favoriteRecipes!: number[];

  favoriteUpdate(_id: number) {
    this.store.dispatch(new FavoriteUpdate(_id));
    if (this.favoriteRecipes.includes(_id))
      this.toastr.success(
        'Добавлено в избранное',
        'Сохранили этот рецепт для вас'
      );
  }

  redirectTo(url: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }

  ngOnInit() {
    this.dataService.getAllPosts().subscribe({
      next: (value) => {
        this.randomRecipes = value;
        const shuffled = Array.from(this.randomRecipes).sort(
          () => 0.5 - Math.random()
        );
        this.randomRecipes = shuffled.slice(0, 4);
      },
    });

    this.store.select(FavoriteState.getFavorite).subscribe({
      next: (favorites) => (this.favoriteRecipes = favorites),
    });
  }
}
