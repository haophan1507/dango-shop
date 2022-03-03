import { Component, OnInit } from '@angular/core';
import { UsersService } from '@frontend/users';

@Component({
  selector: 'admin-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'admin';

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.initAppSession();
  }
}
