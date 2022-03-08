import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'products-search',
  templateUrl: './products-search.component.html',
  styles: [
  ]
})
export class ProductsSearchComponent {
  value = '';

  constructor(
    private router: Router
  ) {}

  onSearch() {
    if (this.value) {
      this.router.navigateByUrl(`/products?name=${this.value}`);
      this.value = '';
    }
  }

}
