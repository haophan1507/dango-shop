import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-account-orders',
  templateUrl: './account-orders.component.html',
  styles: [
  ]
})
export class AccountOrdersComponent implements OnInit, DoCheck {
  activeIndex = 0;
  orders = [];
  ordersFilter = [];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService
      .observeCurrentUser()
      .subscribe(user => {
        if (user) {
          this.usersService
            .getUsersOrder(user.id)
            .subscribe(orders => this.orders = orders)
        }
      })
  }

  ngDoCheck() {
    if (this.activeIndex === 0) {
      this.ordersFilter = this.orders;
    } else {
      this.ordersFilter = this.orders.filter(item => item.status === this.activeIndex - 1)
    }
  }
}
