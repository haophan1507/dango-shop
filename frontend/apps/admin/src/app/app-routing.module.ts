import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@frontend/users';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CommentsListComponent } from './pages/comments/comments-list/comments-list.component';
import { CountOrdersComponent } from './pages/dashboard/count-orders/count-orders.component';
import { CountProductsComponent } from './pages/dashboard/count-products/count-products.component';
import { CountRevenuesComponent } from './pages/dashboard/count-revenues/count-revenues.component';
import { CountUsersComponent } from './pages/dashboard/count-users/count-users.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { PostsFormComponent } from './pages/posts/posts-form/posts-form.component';
import { PostsListComponent } from './pages/posts/posts-list/posts-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ShellComponent } from './shared/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'dashboard/count-orders',
        component: CountOrdersComponent
      },
      {
        path: 'dashboard/count-products',
        component: CountProductsComponent
      },
      {
        path: 'dashboard/count-users',
        component: CountUsersComponent
      },
      {
        path: 'dashboard/count-revenues',
        component: CountRevenuesComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/form',
        component: ProductsFormComponent
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'users/form',
        component: UsersFormComponent
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent
      }, {
        path: 'orders',
        component: OrdersListComponent
      }, {
        path: 'orders/:id',
        component: OrdersDetailComponent
      },
      {
        path: 'comments',
        component: CommentsListComponent
      },
      {
        path: 'posts',
        component: PostsListComponent
      },
      {
        path: 'posts/form',
        component: PostsFormComponent
      },
      {
        path: 'posts/form/:id',
        component: PostsFormComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {}
