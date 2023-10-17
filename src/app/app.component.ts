import { Component } from '@angular/core';
import {DataService} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foodie';

  constructor(private dataService: DataService) {}

  changeRole(role: 'guest' | 'user' | 'admin') {
    this.dataService.role = role;
  }
}
