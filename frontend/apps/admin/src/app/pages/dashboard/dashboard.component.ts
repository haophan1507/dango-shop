import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@frontend/orders';
import { ProductsService } from '@frontend/products';
import { UsersService } from '@frontend/users';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics = [];
  endsubs$: Subject<void> = new Subject();

  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ])
      .pipe(takeUntil(this.endsubs$))
      .subscribe((values) => {
        this.statistics = values;
      });
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
}
