import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email hoặc mật khẩu sai'

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginFormGroup.invalid) return;

    this.auth.login(this.loginForm.email.value, this.loginForm.password.value).subscribe(
      (user) => {
        this.authError = false;
        this.localstorageService.setToken(user.token);
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });;
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Lỗi hệ thống, vui lòng thử lại sau!';
        }
      }
    );
  }

  register() {
    this.router.navigate(['/register']);
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(`^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
