import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesService } from '@frontend/products';
import { JwtInterceptor, UsersModule } from '@frontend/users';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxStripeModule } from 'ngx-stripe';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CommentsListComponent } from './pages/comments/comments-list/comments-list.component';
import { CountOrdersComponent } from './pages/dashboard/count-orders/count-orders.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { PostsFormComponent } from './pages/posts/posts-form/posts-form.component';
import { PostsListComponent } from './pages/posts/posts-list/posts-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ResponsiveMenuComponent } from './shared/responsive-menu/responsive-menu.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CountProductsComponent } from './pages/dashboard/count-products/count-products.component';
import { CountRevenuesComponent } from './pages/dashboard/count-revenues/count-revenues.component';
import { CountUsersComponent } from './pages/dashboard/count-users/count-users.component';

const UX_MODULE = [
  ButtonModule,
  CardModule,
  ToolbarModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule,
  PanelMenuModule,
  TooltipModule,
  RatingModule,
  CalendarModule,
  ChartModule
];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersListComponent,
    OrdersDetailComponent,
    ResponsiveMenuComponent,
    CommentsListComponent,
    PostsListComponent,
    PostsFormComponent,
    CountOrdersComponent,
    CountProductsComponent,
    CountRevenuesComponent,
    CountUsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    FormsModule,
    ReactiveFormsModule,
    UsersModule,
    AppRoutingModule,
    NgxStripeModule.forRoot('pk_test_51KOgxzFqZk9ebbKnL5lQw4tyL315L2T5O9uSfgrxIlMCLoLia4IVTvI8tfU1D4HAUyLLen9FuBSI06nJ5RYZD4UN00AWpVcAIi'),
    ...UX_MODULE
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
