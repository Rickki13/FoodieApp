import { Component } from '@angular/core';
import {DataService} from "../../../data.service";
import {Store} from "@ngxs/store";
import {Users} from "../../../interfaces/users.interface";
import {AuthState} from "../../../store/auth.state";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  constructor(private dataService: DataService, private store: Store) {}

  usersInfo!: Users[];
  roles: Map<string, string> = new Map([
    ['user', 'Пользователь'],
    ['admin', 'Администратор'],
  ]);

  ngOnInit() {
    this.dataService
      .getAllUsers(this.store.selectSnapshot(AuthState.getToken)!)
      .subscribe({
        next: (users) => {
          this.usersInfo = users;
        },
      });
  }
}
