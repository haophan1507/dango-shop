import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@frontend/orders';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-count-orders',
  templateUrl: './count-orders.component.html',
  styles: [
  ]
})
export class CountOrdersComponent implements OnInit, OnDestroy {
  chartData: any;
  inputDate = new Date();
  arrOrders = [];
  endsubs$: Subject<void> = new Subject();

  constructor(
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._getOrders();
    this._renderChart(this.arrOrders);
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _renderChart(arrOrders) {
    this.chartData = {
      labels: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Môt', 'Tháng Mười Hai'],
      datasets: [
        {
          label: 'Số đơn hàng',
          backgroundColor: '#42A5F5',
          data: arrOrders
        }
      ]
    };
  }

  private _getOrders() {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.endsubs$))
      .subscribe(orders => {
        const arrOrders = [];
        const year = this.inputDate.getFullYear()
        for (let i = 1; i < 13; i++) {
          let order = 0;
          const month = i.toString().length < 2 ? `0${i}` : `${i}`;
          const date = `${year}-${month}`;
          orders.forEach(item => {
            if (item.dateOrdered.includes(date)) {
              order += 1;
            }
          })
          arrOrders[i - 1] = order;
        }
        this.arrOrders = arrOrders;
        this._renderChart(this.arrOrders);
      })
  }

  onYearChange(value) {
    this.inputDate = value;
    this._getOrders();
  }
}
