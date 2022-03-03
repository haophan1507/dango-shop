import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UsersService } from '@frontend/users';
import { filter } from 'rxjs';

@Component({
  selector: 'dango-shop-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLogin = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.router.url.includes('login') || this.router.url.includes('register') ? (this.isLogin = true) : (this.isLogin = false);
    });
  }

  ngOnInit(): void {
    this.usersService.initAppSession();
  }
}
