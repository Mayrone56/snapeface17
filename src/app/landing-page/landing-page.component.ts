import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  onClick() {
    // navigation programmatique, qui est une autre façon que routerLink
    this.router.navigateByUrl('facesnaps');
  }
}
