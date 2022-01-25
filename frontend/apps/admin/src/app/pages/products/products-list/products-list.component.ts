import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@frontend/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products = [];
  endsubs$: Subject<void> = new Subject();

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa không?',
      header: 'Xóa',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
          this._getProducts();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Danh mục đã bị xóa' });
        }, () => {
          this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Vui lòng thử lại' });
        });
      }
    });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  private _getProducts() {
    this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(products => {
      this.products = products;
    })
  }

}
