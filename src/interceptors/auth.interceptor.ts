import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {identityStore} from '../stores/identity.store';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = identityStore.store.token;
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                },
                withCredentials: true,
            })
        }

        return next.handle(req).pipe(catchError(e => {
            if (e instanceof HttpErrorResponse) {

                if (e.status == 401) {
                    this.router.navigate(['/auth'])
                }
            }
            return throwError(() => e);
        }));
    }
}
