import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-footer-comp',
  templateUrl: './footer-comp.component.html',
  styleUrls: ['./footer-comp.component.css']
})
export class FooterCompComponent {
  constructor(private router: Router, private activeRouter: ActivatedRoute) {}

  isErrorPage: boolean = false;
  bannerState: boolean = true;

  ngOnInit() {
    const localBannerState = localStorage.getItem('Banner');

    if (localBannerState === 'closed') {
      this.bannerState = false;
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isErrorPage =
          this.activeRouter.snapshot.firstChild?.routeConfig?.path === 'error' ||
          this.activeRouter.snapshot.firstChild?.routeConfig?.path === 'access-denied';
      }
    });
  }

  closeBanner() {
    localStorage.setItem('Banner', 'closed');
    this.bannerState = false;
  }
}
