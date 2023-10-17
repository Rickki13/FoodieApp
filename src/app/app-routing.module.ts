import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { RecipeCatalogComponent } from "./recipe-catalog/recipe-catalog.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { AuthComponent } from "./auth/auth.component";
import { RegisterComponent } from "./register/register.component";
import { RecipeCreateComponent } from "./recipe-create/recipe-create.component";
import { AccessRoleGuard } from "./access-role.guard";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { AdminRecipesComponent } from "./admin-recipes/admin-recipes.component";
import { AdminEditComponent } from "./admin-edit/admin-edit.component";
import { AccessDeniedComponent } from "./access-denied/access-denied.component";
import { ErrorComponent } from "./error/error.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'recipe',
    component: RecipeCatalogComponent
  },
  {
    path: 'recipe/:id',
    component: RecipeDetailComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'create-recipe',
    component: RecipeCreateComponent,
    canActivate: [AccessRoleGuard],
    data: { requiredRole: 'user' }
  },
  {
    path: 'admin',
    canActivate: [AccessRoleGuard],
    data: { requiredRole: 'admin' },
    children: [
      {
        path: 'users',
        component: AdminUsersComponent
      },
      {
        path: 'recipes',
        component: AdminRecipesComponent
      },
      {
        path: 'recipes/:id',
        component: AdminEditComponent
      },
    ]
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: '**',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
