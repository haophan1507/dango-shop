import { Component, OnInit } from '@angular/core';
import { CartService } from '@frontend/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'dango-shop-messages',
  templateUrl: './dango-shop-messages.component.html',
  styles: [
  ]
})
export class DangoShopMessagesComponent implements OnInit {

  constructor(private cartService: CartService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đã cập nhật giỏ hàng!'
      });
    });
  }
}
