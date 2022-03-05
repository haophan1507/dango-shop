import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endsubs$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getCartDetails() {
    this.cartService.cart$
      .pipe(takeUntil(this.endsubs$))
      .subscribe(carts => {
        this.cartItemsDetailed = [];
        this.cartCount = carts?.items?.length ?? 0;
        carts.items?.forEach(cart => {
          this.ordersService
            .getProduct(cart.productId)
            .pipe(take(1))
            .subscribe(product => {
              this.cartItemsDetailed.push({
                product: product,
                quantity: cart.quantity
              })
              this.cartItemsDetailed.sort(this.compare);
            })
        })
      })
  }

  private compare(a, b) {
    if (a.product.name < b.product.name) {
      return -1;
    }
    if (a.product.name > b.product.name) {
      return 1;
    }
    return 0;
  }

  updateCartItemQuantity(event, cartItem: CartItemDetailed) {
    if (typeof event.value === 'number') {
      if (event.value === 0) event.value = 1;
      if (event.value > cartItem.product.countInStock)
        event.value = cartItem.product.countInStock;
      this.cartService.setCartItem({
        productId: cartItem.product.id,
        quantity: event.value
      }, true)
    }
  }

  deleteCartItem(cartItemId: string) {
    this.cartService.deleteCartItem(cartItemId);
  }

  backtoShop() {
    this.router.navigate(['/products'])
  }

}
