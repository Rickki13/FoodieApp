import { Component } from '@angular/core';
import {DataService} from "../../data.service";
import {Store} from "@ngxs/store";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CreateRecipe} from "../../interfaces/recipe-create.interface";
import {AuthState} from "../../store/auth.state";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent {
  constructor(
    private dataService: DataService,
    private store: Store,
    private toastr: ToastrService,
    private router: Router
  ) {}

  fileTarget: any;
  fileName: string = '';
  fileIsSelected: boolean = false;
  fileSizeLimit: number = 10485760;
  fileLimitExceeded: boolean = false;

  createRecipe: CreateRecipe = {
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

  selectFile(event: any) {
    const selectedFile = event.target.files[0];
    this.fileName = selectedFile.name;

    this.fileTarget = event.target;
    if (selectedFile) {
      this.fileIsSelected = true;
      const fileSize = selectedFile.size;

      if (fileSize > this.fileSizeLimit) {
        this.fileLimitExceeded = true;
        event.target.value = '';
        this.fileIsSelected = false;
      }

      this.createRecipe.image = this.fileName;
    }
  }

  deleteFile() {
    this.fileTarget.value = '';
    this.fileIsSelected = false;
    this.fileLimitExceeded = false;
  }

  createNewRecipe() {
    console.log(this.createRecipe);
    this.dataService
      .sendPost(
        this.store.selectSnapshot(AuthState.getToken)!,
        this.createRecipe
      )
      .subscribe({
        next: (value) => {
          this.toastr.success('Рецепт был успешно отправлен!');
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error('Рецепт не отправлен!', 'Ошибка ' + err.status);
        },
      });
  }

  ngOnInit() {}
}
