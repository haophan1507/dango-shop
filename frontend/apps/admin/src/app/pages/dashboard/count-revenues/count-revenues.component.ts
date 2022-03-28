import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@frontend/orders';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-count-revenues',
  templateUrl: './count-revenues.component.html',
  styles: [
  ]
})

export class CountRevenuesComponent implements OnInit, OnDestroy {
  chartData: any;
  inputDate = new Date();
  arrRevenues = [];
  endsubs$: Subject<void> = new Subject();

  constructor(
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._getRevenues();
    this._renderChart(this.arrRevenues);
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _renderChart(arrRevenues) {
    this.chartData = {
      labels: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Môt', 'Tháng Mười Hai'],
      datasets: [
        {
          label: 'Tổng doanh thu',
          backgroundColor: '#FFA726',
          data: arrRevenues
        }
      ]
    };
  }

  private _getRevenues() {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.endsubs$))
      .subscribe(orders => {
        const arrRevenues = [];
        const year = this.inputDate.getFullYear()
        for (let i = 1; i < 13; i++) {
          let revenues = 0;
          const month = i.toString().length < 2 ? `0${i}` : `${i}`;
          const date = `${year}-${month}`;
          orders.forEach(order => {
            if (order.dateOrdered.includes(date)) {
              revenues += +order.totalPrice;
            }
          })
          arrRevenues[i - 1] = revenues;
        }
        this.arrRevenues = arrRevenues;
        this._renderChart(this.arrRevenues);
      })
  }

  onYearChange(value) {
    this.inputDate = value;
    this._getRevenues();
  }
}