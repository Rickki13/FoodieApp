import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent{
  constructor(private location: Location) {}

  urlImg = 'https://ea-backend.wckz.space/dist/assets/image/image_404.png'
  previous() {
    this.location.back();
  }

}
