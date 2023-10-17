import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from "@ngxs/store";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { ErrorComponent } from './error/error.component';
import { DataService } from "./data.service";
import { AccessRoleGuard } from "./access-role.guard";
import { HomeComponent } from './home/home.component';
import { RecipeCatalogComponent } from './recipe-catalog/recipe-catalog.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminRecipesComponent } from './admin-recipes/admin-recipes.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';

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
    RecipeCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([]),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [DataService, AccessRoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
