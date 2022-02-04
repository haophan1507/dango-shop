import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { OrdersModule } from '@frontend/orders';
import { ProductsModule } from '@frontend/products';
import { UiModule } from '@frontend/ui';
import { JwtInterceptor, UsersModule } from '@frontend/users';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxStripeModule } from 'ngx-stripe';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { DangoShopMessagesComponent } from './shared/messages/dango-shop-messages/dango-shop-messages.component';
import { NavComponent } from './shared/nav/nav.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    DangoShopMessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    ButtonModule,
    ProductsModule,
    UiModule,
    OrdersModule,
    ToastModule,
    UsersModule,
    NgxStripeModule.forRoot('pk_test_51KOgxzFqZk9ebbKnL5lQw4tyL315L2T5O9uSfgrxIlMCLoLia4IVTvI8tfU1D4HAUyLLen9FuBSI06nJ5RYZD4UN00AWpVcAIi')
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
