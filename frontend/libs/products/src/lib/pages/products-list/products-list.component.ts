import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean;
  endsubs$: Subject<void> = new Subject();

  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
      params.categoryid ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    })
    this._getCategories();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  categoryFilter() {
    const selectedCategories = this
      .categories
      .filter(category => category.checked)
      .map(category => category.id);

    this._getProducts(selectedCategories)
  }

  private _getCategories() {
    this.catService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe(categories => this.categories = categories);
  }

  private _getProducts(categoryFilter?: string[]) {
    this.prodService
      .getProducts(categoryFilter)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(products => this.products = products);
  }

}
