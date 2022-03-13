import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@frontend/orders';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-count-products',
  templateUrl: './count-products.component.html',
  styles: [
  ]
})

export class CountProductsComponent implements OnInit, OnDestroy {
  chartData: any;
  inputDate = new Date();
  arrProducts = [];
  endsubs$: Subject<void> = new Subject();

  constructor(
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._getProducts();
    this._renderChart(this.arrProducts);
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _renderChart(arrProducts) {
    this.chartData = {
      labels: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Môt', 'Tháng Mười Hai'],
      datasets: [
        {
          label: 'Số sản phẩm',
          backgroundColor: '#66BB6A',
          data: arrProducts
        }
      ]
    };
  }

  private _getProducts() {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.endsubs$))
      .subscribe(orders => {
        const arrProducts = [];
        const year = this.inputDate.getFullYear()
        for (let i = 1; i < 13; i++) {
          let products = 0;
          const month = i.toString().length < 2 ? `0${i}` : `${i}`;
          const date = `${year}-${month}`;
          orders.forEach(order => {
            if (order.dateOrdered.includes(date)) {
              order.orderItems.forEach(item => {
                products += item.quantity;
              })
            }
          })
          arrProducts[i - 1] = products;
        }
        this.arrProducts = arrProducts;
        this._renderChart(this.arrProducts);
      })
  }

  onYearChange(value) {
    this.inputDate = value;
    this._getProducts();
  }
}
