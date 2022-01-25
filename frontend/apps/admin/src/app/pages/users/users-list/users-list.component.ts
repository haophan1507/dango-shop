import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@frontend/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  endsubs$: Subject<void> = new Subject();

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  deleteUser(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa không?',
      header: 'Xóa',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(categoryId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
          this._getUsers();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Người dùng đã bị xóa' });
        }, () => {
          this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Vui lòng thử lại' });
        });
      }
    });
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`)
  }

  getCountryName(countryKey: string) {
    if (countryKey) return this.usersService.getCountry(countryKey);
  }

  private _getUsers() {
    this.usersService.getUsers().pipe(takeUntil(this.endsubs$)).subscribe(users => this.users = users);
  }

}
