import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@frontend/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  onStatusChange(event) {
    this.ordersService.updateOrder({ status: event.value }, this.order.id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Trạng thái đã được cập nhật' });
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Vui lòng thử lại' });
    });
  }

  _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map(key => ({ id: key, name: ORDER_STATUS[key].label }));
  }

  private _getOrder() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.ordersService.getOrder(params.id).subscribe(order => this.order = order);
      }
    })
  }
}
