import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS, TYPE_PAYMENT } from '@frontend/orders';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;
  type_payment = TYPE_PAYMENT;
  endsubs$: Subject<void> = new Subject();

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  onStatusChange(event) {
    this.ordersService
      .updateOrder({ status: event.value }, this.order.id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(() => {
        this._getOrder();
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Trạng thái đã được cập nhật' });
      }, (error) => {
        if (error.status === 500) {
          this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Sản phẩm đang tạm hết hàng' });
          this.selectedStatus = 0;
        }
        else if (error.status === 406) {
          this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Không thể lùi lại trạng thái' });
          this.selectedStatus = 0;
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Vui lòng thử lại' });
        }
      });
  }

  _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map(key => ({ id: key, name: ORDER_STATUS[key].label }));
  }

  private _getOrder() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.ordersService.getOrder(params.id).pipe(takeUntil(this.endsubs$)).subscribe(order => this.order = order);
      }
    })
  }
}
