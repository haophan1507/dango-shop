import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ui-banner',
  templateUrl: './banner.component.html',
  styles: [
  ]
})
export class BannerComponent {

  constructor(
    private router: Router
  ) {}

  handleNavigateProduct() {
    this.router.navigateByUrl(`/products`);
  }

}
