import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-account-change-password',
  templateUrl: './account-change-password.component.html',
  styles: [
  ]
})
export class AccountChangePasswordComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.ConfirmedValidator('newPassword', 'confirmPassword')
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    this.usersService
      .observeCurrentUser()
      .subscribe(user => {
        if (user) {
          this.usersService.updateUser({
            id: user.id,
            password: this.userForm.newPassword.value
          }).subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: `Cập nhật mật khẩu thành công`
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
      })
  }

  get userForm() {
    return this.form.controls;
  }

  private ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      console.log(control, matchingControl);

      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
