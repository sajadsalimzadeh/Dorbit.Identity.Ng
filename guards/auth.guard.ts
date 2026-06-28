import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/api";
import { HttpErrorResponse } from '@angular/common/http';
import { AuthRepository } from '../repositories/auth.repository';
import { AccessRepository } from '@identity/repositories/access.repository';
import { PromiseUtil } from '@framework/utils';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private accessRepository: AccessRepository,
        private authRepository: AuthRepository,
        private messageService: MessageService,
        private translateService: TranslateService,
        private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const accessesResult = await PromiseUtil.fromObservable(this.accessRepository.getDictionary());
                if (!accessesResult.success || !accessesResult.data) {
                    this.gotoLoginPage();
                    return;
                }

                const loginInfoResult = await PromiseUtil.fromObservable(this.authRepository.getLoginInfo());
                if (!loginInfoResult.success || !loginInfoResult.data) {
                    this.gotoLoginPage();
                    return;
                }

                const identity = this.authRepository.identity = loginInfoResult.data;
                const deepAccessibility: string[] = [];
                identity.accessibility.forEach(access => {
                    deepAccessibility.push(access);
                    if (accessesResult.data?.[access]) {
                        deepAccessibility.push(...accessesResult.data[access].map(x => x.toLowerCase()));
                    }
                });
                identity.accessibility = deepAccessibility;

                resolve(loginInfoResult.success);
            } catch (e) {
                reject(e);
                
                this.messageService.add({
                    severity: 'error',
                    detail: this.translateService.instant('message.authentication-failed')
                });

                if (e instanceof HttpErrorResponse && e.status != 401) {
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
    }

    private async gotoLoginPage() {
        await this.router.navigate(['/auth']);
    }
}
