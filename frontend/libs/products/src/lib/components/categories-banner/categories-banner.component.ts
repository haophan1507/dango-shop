import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endsubs$: Subject<void> = new Subject();
  responsiveOptions;


  constructor(
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe(categories => this.categories = categories);
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 2,
        numScroll: 1
      }
    ];
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

}
