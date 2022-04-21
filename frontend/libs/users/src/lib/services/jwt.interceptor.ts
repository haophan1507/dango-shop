import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private localstorageToken: LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localstorageToken.getToken();
    const isAPIUrl = request.url.startsWith('https://dango-shop.herokuapp.com/api/v1/');

    if (token && isAPIUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}