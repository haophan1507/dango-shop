import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email đã tồn tại'

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initregisterForm();
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.registerFormGroup.invalid) return;

    this.auth.register(
      this.registerForm.email.value,
      this.registerForm.password.value,
      this.registerForm.name.value,
      this.registerForm.phone.value
    ).subscribe(
      () => {
        this.authError = false;
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Lỗi hệ thống, vui lòng thử lại sau!';
        }
      }
    );
  }

  login() {
    this.router.navigate(['/login']);
  }

  private _initregisterForm() {
    this.registerFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get registerForm() {
    return this.registerFormGroup.controls;
  }

}
