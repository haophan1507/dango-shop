import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'users-account',
  templateUrl: './account.component.html',
  styles: [
  ]
})
export class AccountComponent {

  constructor(
    private authService: AuthService
  ) {}

  logoutUser() {
    this.authService.logout();
  }
}
