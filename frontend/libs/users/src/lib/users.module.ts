import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { AccountIconComponent } from './components/account-icon/account-icon.component';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { AccountOrdersComponent } from './pages/account-orders/account-orders.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardUser } from './services/auth-guard-user.service';
import { UsersEffects } from './state/users.effects';
import { UsersFacade } from './state/users.facade';
import { TagModule } from 'primeng/tag';
import * as fromUsers from './state/users.reducer';
import { AccountOrderComponent } from './components/account-order/account-order.component';
import { AccountChangePasswordComponent } from './pages/account-change-password/account-change-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'account',
    canActivate: [AuthGuardUser],
    component: AccountComponent,
    children: [
      {
        path: '',
        component: AccountInfoComponent
      },
      {
        path: 'info',
        component: AccountInfoComponent
      },
      {
        path: 'orders',
        component: AccountOrdersComponent
      },
      {
        path: 'change-password',
        component: AccountChangePasswordComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    CardModule,
    FormsModule,
    ToastModule,
    DropdownModule,
    TabViewModule,
    TagModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: [LoginComponent, RegisterComponent, AccountIconComponent, AccountComponent, AccountInfoComponent, AccountOrdersComponent, AccountOrderComponent, AccountChangePasswordComponent],
  providers: [UsersFacade],
  exports: [AccountIconComponent, AccountOrderComponent]
})
export class UsersModule {}
