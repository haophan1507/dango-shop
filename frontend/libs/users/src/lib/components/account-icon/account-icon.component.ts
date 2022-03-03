import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-account-icon',
  templateUrl: './account-icon.component.html',
  styles: [
  ]
})
export class AccountIconComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._checkUser();
  }

  onSubmit() {
    this.usersService
      .observeCurrentUser()
      .subscribe((user) => {
        if (user) {
          this.router.navigate(['/account/info'])
        } else {
          this.router.navigate(['/login'])
        }
      });
  }

  logoutUser() {
    this.authService.logout();
  }

  private _checkUser() {

  }
}
