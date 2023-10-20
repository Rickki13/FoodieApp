import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home-page/home.component";
import { RecipeCatalogComponent } from "./components/recipe-catalog/recipe-catalog.component";
import { RecipeDetailComponent } from "./components/recipe-catalog/recipe-detail/recipe-detail.component";
import { AuthComponent } from "./components/auth/auth.component";
import { RegisterComponent } from "./components/register/register.component";
import { RecipeCreateComponent } from "./components/recipe-create/recipe-create.component";
import { AccessRoleGuard } from "./access-role.guard";
import { AdminUsersComponent } from "./components/admin-panel/admin-users/admin-users.component";
import { AdminRecipesComponent } from "./components/admin-panel/admin-recipes/admin-recipes.component";
import { AdminEditComponent } from "./components/admin-panel/admin-recipes/admin-edit/admin-edit.component";
import { AccessDeniedComponent } from "./components/access-denied/access-denied.component";
import { ErrorComponent } from "./components/error/error.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";

const routes: Routes = [
  {
    path: '',
    title: 'Главная страница',
    component: HomeComponent
  },
  {
    path: 'recipe',
    title: 'Каталог рецептов',
    component: RecipeCatalogComponent
  },
  {
    path: 'recipe/:id',
    title: 'Рецепт',
    component: RecipeDetailComponent
  },
  {
    path: 'auth',
    title: 'Авторизация',
    component: AuthComponent
  },
  {
    path: 'register',
    title: 'Регистрация',
    component: RegisterComponent
  },
  {
    path: 'create-recipe',
    title: 'Создание рецепта',
    component: RecipeCreateComponent,
    canActivate: [AccessRoleGuard],
    data: { requiredRole: 'user' }
  },
  {
    path: 'admin',
    title: 'Панель администрирования',
    component: AdminPanelComponent,
    canActivate: [AccessRoleGuard],
    data: { requiredRole: 'admin' },
    children: [
      {
        path: 'users',
        title: 'Управление пользователями',
        component: AdminUsersComponent
      },
      {
        path: 'recipes',
        title: 'Управление рецептами ',
        component: AdminRecipesComponent
      },
      {
        path: 'recipes/:id',
        title: 'Редактирование рецепта ',
        component: AdminEditComponent
      },
    ]
  },
  {
    path: 'access-denied',
    title: 'Доступ запрещен',
    component: AccessDeniedComponent
  },
  {
    path: 'error',
    title: 'Страница не найдена',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: '/error',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
