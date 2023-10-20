import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {Router} from "@angular/router";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor(public dataService: DataService, private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'Сборник кулинарных рецептов, для всей семьи',
    });
    this.meta.updateTag({
      name: 'title',
      content: 'Foodie: Главная',
    });
  }
}
