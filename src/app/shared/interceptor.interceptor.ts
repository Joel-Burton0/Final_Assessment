import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.authService.isLoggedIn()){
      let myRequest = request.clone({
        setHeaders:{
          Authorization:`Bearer ${this.authService.getToken()}`
        }
      });
      return next.handle(myRequest);
    }
    return next.handle(request);
  }
}
