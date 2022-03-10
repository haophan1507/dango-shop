import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-count-orders',
  templateUrl: './count-orders.component.html',
  styles: [
  ]
})
export class CountOrdersComponent implements OnInit {
  chartData: any;
  inputDate: Date | number;
  arrProducts = [65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40];
  arrOrders = [28, 48, 40, 19, 86, 27, 90, 48, 40, 19, 86, 27, 90];
  arrRevenue = [40, 19, 86, 27, 90, 48, 40, 19, 81, 56, 100, 40];

  constructor() {}

  ngOnInit(): void {
    this.inputDate = new Date();

    this.chartData = {
      labels: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Môt', 'Tháng Mười Hai'],
      datasets: [
        {
          label: 'Số đơn hàng',
          backgroundColor: '#42A5F5',
          data: this.arrProducts
        },
        {
          label: 'Số hàng hóa',
          backgroundColor: '#FFA726',
          data: this.arrOrders
        },
        {
          label: 'Doanh thu',
          backgroundColor: '#66BB6A',
          data: this.arrRevenue
        }
      ]
    };
  }

  onYearChange(e) {
    console.log(e);
  }

}
