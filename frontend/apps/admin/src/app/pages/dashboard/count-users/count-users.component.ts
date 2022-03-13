import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@frontend/orders';
import { UsersService } from '@frontend/users';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-count-users',
  templateUrl: './count-users.component.html',
  styles: [
  ]
})
export class CountUsersComponent implements OnInit, OnDestroy {
  dataAdminAndCustomer: any;
  dataBuyers: any;
  admins = 0;
  customers = 0;
  customersBuy = 0;
  endsubs$: Subject<void> = new Subject();

  constructor(
    private usersService: UsersService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._getAdminAndCustomer();
    this._getCustomers();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _renderAdminAndCustomer(admins: any, customers: any) {
    this.dataAdminAndCustomer = {
      labels: ['Admin', 'Khách hàng'],
      datasets: [
        {
          data: [admins, customers],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784"
          ]
        }
      ]
    }
  }

  private _renderCustomers(customerBuy: any, customers: any) {
    this.dataBuyers = {
      labels: ['Khách hàng đã mua', 'Khách hàng chưa mua'],
      datasets: [
        {
          data: [customerBuy, customers],
          backgroundColor: [
            "#42A5F5",
            "#FFA726"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#FFB74D"
          ]
        }
      ]
    }
  }

  private _getCustomers() {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.endsubs$))
      .subscribe(orders => {
        const arrCustomerBuy = [];
        orders.forEach(order => {
          if (!arrCustomerBuy.includes(order.user.id)) {
            arrCustomerBuy.push(order.user.id);
          }
        })
        this.customersBuy = arrCustomerBuy.length;
        this._renderCustomers(this.customersBuy, this.customers + this.admins - this.customersBuy)
      })
  }

  private _getAdminAndCustomer() {
    this.usersService
      .getUsers()
      .pipe(takeUntil(this.endsubs$))
      .subscribe(users => {
        this.admins = 0;
        this.customers = 0;
        users.forEach(user => {
          if (user.isAdmin) {
            this.admins += 1;
          } else {
            this.customers += 1;
          }
        })
        this._renderAdminAndCustomer(this.admins, this.customers);
      })
  }
}
