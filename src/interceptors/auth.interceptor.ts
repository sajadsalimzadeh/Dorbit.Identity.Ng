import {Injectable, InjectionToken, Injector} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";

export const BEARER_TOKEN = new InjectionToken<() => string>('CSRF Token')

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.injector.get(BEARER_TOKEN)?.call(this);
    if(token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      })
    }

    return next.handle(req).pipe(catchError(e => {
      if(e instanceof HttpErrorResponse) {
        if(e.status == 401) {
          this.router.navigate(['/auth'])
        }
      }
      return throwError(() => e);
    }));
  }
}
