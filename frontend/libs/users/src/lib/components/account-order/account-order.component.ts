import { Component, Input, OnInit } from '@angular/core';
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
}
