import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLUsers = 'https://dango-shop.herokuapp.com/api/v1/' + 'users';

  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/login`, { email, password });
  }

  register(email: string, password: string, name: string, phone: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/register`, { email, password, name, phone });
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
