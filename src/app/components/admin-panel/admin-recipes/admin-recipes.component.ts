import { Component } from '@angular/core';
import {DataService} from "../../../data.service";
import {Store} from "@ngxs/store";
import {AuthState} from "../../../store/auth.state";
import {HttpErrorResponse} from "@angular/common/http";
import {Posts} from "../../../interfaces/posts.interface";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-recipes',
  templateUrl: './admin-recipes.component.html',
  styleUrls: ['./admin-recipes.component.css']
})
export class AdminRecipesComponent {
  constructor(
    private dataService: DataService,
    private store: Store,
    private toastr: ToastrService
  ) {}

  postsInfo!: Posts[];

  removeId!: number;

  deleteRecipe() {
    console.log(this.removeId);
    this.dataService
      .deletePost(this.store.selectSnapshot(AuthState.getToken)!, this.removeId)
      .subscribe({
        next: (value) => {

          this.toastr.success('Выполнено!', 'Рецепт был успешно удалён!');
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(
            'Не удалось удалить рецепт!',
            'Ошибка #' + err.status
          );
        },
      });
  }

  ngOnInit() {
    this.dataService.getAllPosts().subscribe({
      next: (post) => {
        this.postsInfo = post;
      },
    });
  }
}
