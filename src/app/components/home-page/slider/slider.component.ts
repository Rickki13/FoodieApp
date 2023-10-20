import { Component } from '@angular/core';
import {DataService} from "../../../data.service";
import {Posts} from "../../../interfaces/posts.interface";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  constructor(private dataService: DataService) {}

  postsArray: Posts[] = [];

  postsFavoriteArray: Posts[] = [];

  ngOnInit() {
    this.dataService.getAllPosts().subscribe({
      next: (value) => {
        this.postsArray = value;
        this.postsFavoriteArray = value.filter(
          (value) => value.favorite
        );
      },
    });
  }
}
