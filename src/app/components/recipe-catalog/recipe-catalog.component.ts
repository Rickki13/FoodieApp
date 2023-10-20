import { Component } from '@angular/core';
import {DataService} from "../../data.service";
import {Meta} from "@angular/platform-browser";
import {Store} from "@ngxs/store";
import {ToastrService} from "ngx-toastr";
import {Posts} from "../../interfaces/posts.interface";
import {FavoriteState} from "../../store/favorite.state";
import {FavoriteUpdate} from "../../store/model/favorite.model";

@Component({
  selector: 'app-recipe-catalog',
  templateUrl: './recipe-catalog.component.html',
  styleUrls: ['./recipe-catalog.component.css']
})
export class RecipeCatalogComponent {
  constructor(
    private dataService: DataService,
    private meta: Meta,
    private store: Store,
    private toastr: ToastrService,
  ) {
    this.meta.updateTag({
      name: 'title',
      content: 'Foodie: Каталог рецептов',
    });
    this.meta.updateTag({
      name: 'description',
      content: 'Все самые лучшие рецепты собраны здесь',
    });
  }

  postsInfo!: Posts[];
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
      next: (posts: Posts[]) => {
        this.postsInfo = posts;
      },
    });

    this.store.select(FavoriteState.getFavorite).subscribe({
      next: (favorites) => (this.favoriteRecipes = favorites),
    });
  }
}
