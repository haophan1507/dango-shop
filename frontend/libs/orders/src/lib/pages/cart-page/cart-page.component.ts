import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { of, timer } from 'rxjs';
import { debounce } from 'rxjs/operators'

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
            })
        })
      })
  }

  updateCartItemQuantity(event, cartItem: CartItemDetailed) {
    if (event.originalEvent instanceof MouseEvent) {
      this.cartService.setCartItem({
        productId: cartItem.product.id,
        quantity: event.value
      }, true);
    }
  }

  deleteCartItem(cartItemId: string) {
    this.cartService.deleteCartItem(cartItemId);
  }

  backtoShop() {
    this.router.navigate(['/products'])
  }

}
