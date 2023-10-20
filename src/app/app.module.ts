import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from "@ngxs/store";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { ErrorComponent } from './components/error/error.component';
import { AccessRoleGuard } from "./access-role.guard";
import { HomeComponent } from './components/home-page/home.component';
import { RecipeCatalogComponent } from './components/recipe-catalog/recipe-catalog.component';
import { RecipeDetailComponent } from './components/recipe-catalog/recipe-detail/recipe-detail.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminUsersComponent } from './components/admin-panel/admin-users/admin-users.component';
import { AdminRecipesComponent } from './components/admin-panel/admin-recipes/admin-recipes.component';
import { AdminEditComponent } from './components/admin-panel/admin-recipes/admin-edit/admin-edit.component';
import { RecipeCreateComponent } from './components/recipe-create/recipe-create.component';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { HeaderCompComponent } from './components/header-comp/header-comp.component';
import { FooterCompComponent } from './components/footer-comp/footer-comp.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ToastrModule } from "ngx-toastr";
import { NgxsResetPluginModule } from "ngxs-reset-plugin";
import { AuthState } from "./store/auth.state";
import { RecipeState } from "./store/recipe.state";
import { SliderComponent } from './components/home-page/slider/slider.component';
import { BestRecipeComponent } from './components/home-page/best-recipe/best-recipe.component';
import { AboutUsComponent } from './components/home-page/about-us/about-us.component';
import { TryRecipeComponent } from './components/home-page/try-recipe/try-recipe.component';
import { NotificationComponent } from './components/home-page/notification/notification.component';
import {FavoriteState} from "./store/favorite.state";
import {CommonModule, registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    RecipeCatalogComponent,
    RecipeDetailComponent,
    AccessDeniedComponent,
    AuthComponent,
    RegisterComponent,
    AdminUsersComponent,
    AdminRecipesComponent,
    AdminEditComponent,
    RecipeCreateComponent,
    HeaderCompComponent,
    FooterCompComponent,
    AdminPanelComponent,
    SliderComponent,
    BestRecipeComponent,
    AboutUsComponent,
    TryRecipeComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([AuthState, RecipeState, FavoriteState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),
    BsDropdownModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
    })
  ],
  providers: [AccessRoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
