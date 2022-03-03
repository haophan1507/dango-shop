import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem, CartService } from '@frontend/orders';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  quantity = 1;
  endsubs$: Subject<void> = new Subject();

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.productid) {
        this._getProduct(params.productid);
      }
    })
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    };
    this.cartService.setCartItem(cartItem);
  }

  buyNow() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    };
    this.cartService.setCartItem(cartItem);
    this.router.navigateByUrl('/cart');
  }

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(product => this.product = product);
  }
}
