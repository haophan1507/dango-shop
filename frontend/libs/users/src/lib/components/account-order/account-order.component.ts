import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order';
import { ORDER_STATUS } from '../../order.constants';

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
