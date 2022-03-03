import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-account-info',
  templateUrl: './account-info.component.html',
  styles: [
  ]
})
export class AccountInfoComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  countries = [];
  currentUserId: string;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
    this._fillUser();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const user: User = {
      id: this.currentUserId,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value
    };

    this.usersService.updateUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: `Cập nhật thông tin thành công`
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Thất bại',
          detail: 'Vui lòng thử lại'
        });
      }
    );
  }

  private _fillUser() {
    this.usersService
      .observeCurrentUser()
      .subscribe((user) => {
        if (user) {
          this.currentUserId = user.id;
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.phone.setValue(user.phone);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.zip.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.country.setValue(user.country);
        }
      });
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  get userForm() {
    return this.form.controls;
  }

}
