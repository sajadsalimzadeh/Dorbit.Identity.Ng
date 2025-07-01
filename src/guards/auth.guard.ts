import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from '@angular/common/http';
import {AuthRepository} from '../repositories/auth.repository';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private authRepository: AuthRepository,
        private messageService: MessageService,
        private translateService: TranslateService,
        private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return new Promise<boolean>((resolve, reject) => {
            this.authRepository.getLoginInfo().subscribe({
                next: res => {
                    if (!res.success) {
                        this.gotoLoginPage();
                    }

                    resolve(res.success);
                },
                error: e => {
                    this.messageService.add({
                        severity: 'error',
                        detail: this.translateService.instant('message.authentication-failed')
                    });
                    reject(e);

                    if(e instanceof HttpErrorResponse && e.status != 401) {
                        setTimeout(() => {
                            caches.keys().then(async cacheKeys => {
                                for (const cacheKey of cacheKeys) {
                                    await caches.delete(cacheKey);
                                }
                                (location as any).reload(true);
                            })
                        }, 10000)
                    }
                }
            })
        })
    }

    private async gotoLoginPage() {
        await this.router.navigate(['/auth']);
    }
}
