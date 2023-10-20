import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent{
  constructor(private location: Location) {}

  urlImg = 'https://ea-backend.wckz.space/dist/assets/image/image_404.png'
  previous() {
    this.location.back();
  }
}
