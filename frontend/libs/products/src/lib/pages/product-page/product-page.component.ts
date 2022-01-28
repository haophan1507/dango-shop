import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  quantity: number;
  endsubs$: Subject<void> = new Subject();

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute
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
    console.log('add to cart');
  }

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(product => this.product = product);
  }
}
