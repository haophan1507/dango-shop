import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'users-account',
  templateUrl: './account.component.html',
  styles: [
  ]
})
export class AccountComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  logoutUser() {
    this.authService.logout();
  }
}
