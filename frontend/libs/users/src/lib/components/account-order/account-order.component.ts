import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Order, ORDER_STATUS } from '@frontend/orders';

@Component({
  selector: 'users-account-order',
  templateUrl: './account-order.component.html',
  styles: [
  ]
})
export class AccountOrderComponent {
  @Input() order: Order;
  orderStatus = ORDER_STATUS;

  constructor(private router: Router) {}

  handleNavigateProduct(productId) {
    this.router.navigateByUrl(`/products/${productId}`);
  }
}
