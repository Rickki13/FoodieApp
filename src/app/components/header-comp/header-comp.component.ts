import { Component } from '@angular/core';

import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {Auth} from "../../store/model/auth.model";
import {AuthState} from "../../store/auth.state";
import {StateReset} from "ngxs-reset-plugin";


@Component({
  selector: 'app-header-comp',
  templateUrl: './header-comp.component.html',
  styleUrls: ['./header-comp.component.css'],

})
export class HeaderCompComponent {

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {}

  isErrorPage: boolean = false;

  curRole!: string;
  curUser: Auth = {
    access_token: null,
    role: 'guest',
    username: null,
    id: null,
    fullname: null,
    image: null,
    isAuth: false
  };

  roles: Map<string, string> = new Map([
    ['user', 'Пользователь'],
    ['admin', 'Администратор'],
  ]);

  logout() {
    this.store.dispatch(new StateReset());
    this.router.navigate(['auth']);
  }

  ngOnInit() {
    this.store.select(AuthState.getAuthRole).subscribe({
      next: (value) => {
        this.curRole = value;
        this.curUser = this.store.selectSnapshot(AuthState.getAuthObject);
        console.log(this.curUser);
      },
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isErrorPage =
          this.activeRouter.snapshot.firstChild?.routeConfig?.path === 'error' ||
          this.activeRouter.snapshot.firstChild?.routeConfig?.path === 'access-denied';
      }
    });
  }
}
