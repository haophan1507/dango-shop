import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ProductsService } from '@frontend/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  categories = [];
  isSubmitted = false;
  editMode = false;
  imageDisplay: string | ArrayBuffer;
  currentProductId: string;
  endsubs$: Subject<void> = new Subject();

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    })

    if (this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  private _updateProduct(productData: FormData) {
    this.productsService.updateProduct(productData, this.currentProductId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Sản phẩm đã được cập nhật' });
      timer(1000).toPromise().then(() => {
        this.location.back();
      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Vui lòng thử lại' });
    });
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).pipe(takeUntil(this.endsubs$)).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Sản phẩm mới đã được tạo' });
      timer(1000).toPromise().then(() => {
        this.location.back();
      })
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Vui lòng thử lại' });
    });
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).pipe(takeUntil(this.endsubs$)).subscribe(product => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category.id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        })
      }
    })
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: [''],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(categories => {
      this.categories = categories;
    })
  }

  get productForm() {
    return this.form.controls;
  }

  onCancel() {
    this.location.back();
  }
}
