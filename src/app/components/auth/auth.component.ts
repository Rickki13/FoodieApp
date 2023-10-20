import { Component } from '@angular/core';
import {DataService} from "../../data.service";
import {Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthState} from "../../store/auth.state";
import {AuthUpdate, User} from "../../store/model/auth.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(
    private dataService: DataService,
    private store: Store,
    private router: Router
  ) {}

  errData: boolean = false;
  auth: User = {
    username: '',
    password: '',
  };

  authorizeUser() {
    this.dataService
      .auth(this.auth.username, this.auth.password)
      .subscribe({
        next: (value) => {
          this.store.dispatch(
            new AuthUpdate({
              id: value.id,
              username: value.username,
              access_token: value.access_token,
              fullname: value.fullname,
              role: value.role,
              isAuth: true,
              image: value.image,
            })
          );

          this.dataService.role = this.store.selectSnapshot(
            AuthState.getAuthRole
          );
          this.router.navigateByUrl('');
        },

        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.errData = true;
          }
        },
      });
  }
}
