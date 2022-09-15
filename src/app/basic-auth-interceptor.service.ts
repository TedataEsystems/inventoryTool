import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ConfigureService } from './shared/service/configure.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let authReq = request;
    const token = localStorage.getItem("tokNum");

    if (token != null && token != undefined && token != '') {
      authReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    return next.handle(authReq).pipe(catchError(err => {
      if ((err && err.status === 401)||err.status===0) {
        localStorage.clear();
        err.error = { Message: "", status: 0 };
        err.error.status = 401;
        location.reload();
      }
      const error = err.error.message || err.statusText;
      return throwError(err);
    }));
  }
}
