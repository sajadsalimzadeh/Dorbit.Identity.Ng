import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {


  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

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
