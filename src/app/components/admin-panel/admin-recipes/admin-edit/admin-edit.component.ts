import { Component } from '@angular/core';
import {DataService} from "../../../../data.service";
import {Store} from "@ngxs/store";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AuthState} from "../../../../store/auth.state";
import {HttpErrorResponse} from "@angular/common/http";
import {CreateRecipe} from "../../../../interfaces/recipe-create.interface";

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent {
  constructor(
    private dataService: DataService,
    private store: Store,
    private toastr: ToastrService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  recipeId!: number;

  editRecipe: CreateRecipe = {
    title: null,
    body: null,
    tags: null,
    image: null,
    favorite: false,
    timeCooking: null,
    foodValue: {
      calories: null,
      fats: null,
      carbohydrates: null,
      belki: null,
    },
    additionalInformation: {
      ingredients: [''],
      details: [
        {
          title: '',
          body: '',
        },
      ],
    },
  };

  sendEditedRecipe() {
    this.dataService
      .patchPost(
        this.store.selectSnapshot(AuthState.getToken)!,
        this.recipeId,
        this.editRecipe
      )
      .subscribe({
        next: (value) => {
          this.toastr.success(
            'Успешно!',
            'Содержание рецепта было успешно изменено!'
          );
          this.router.navigate(['/admin/recipes']);
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error('Рецепт не был отправлен!', 'Ошибка ' + err.status);
        },
      });
  }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.recipeId = Number(params.get('id')!);
      },
    });
    this.dataService.getRecipe(this.recipeId).subscribe({
      next: (recipe) => {
        this.editRecipe = recipe;
      },
    });
  }
}
