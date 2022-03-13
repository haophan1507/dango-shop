import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '@frontend/users';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-count-users',
  templateUrl: './count-users.component.html',
  styles: [
  ]
})
export class CountUsersComponent implements OnInit, OnDestroy {
  dataAdminAndCustomer: any;
  admins = 0;
  customers = 0;
  endsubs$: Subject<void> = new Subject();

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this._getAdminAndCustomer();

  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _renderAdminAndCustomer(admins, customers) {
    console.log(admins, customers);

    this.dataAdminAndCustomer = {
      labels: ['Admin', 'Khách hàng'],
      datasets: [
        {
          data: [admins, customers],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784"
          ]
        }
      ]
    }
  }

  private _getAdminAndCustomer() {
    this.usersService
      .getUsers()
      .pipe(takeUntil(this.endsubs$))
      .subscribe(users => {
        users.forEach(user => {
          this.admins = 0;
          this.customers = 0;
          if (user.isAdmin) {
            this.admins += 1;
          } else {
            this.customers += 1;
          }
        })
        this.admins = 3;
        this.customers = 1;
        console.log(this.admins, this.customers);
      })

    this._renderAdminAndCustomer(this.admins, this.customers);
  }
}
