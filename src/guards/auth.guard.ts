import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthRepository} from "../repositories/auth.repository";
import {PanelService} from "../../../panel/src/services/panel.service";
import {CryptoUtil, DialogService, MessageService} from "@framework";
import {IdentityMessageComponent} from "../components/message/index.component";
import {TranslateService} from "@ngx-translate/core";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private panelService: PanelService,
    private dialogService: DialogService,
    private authRepository: AuthRepository,
    private messageService: MessageService,
    private translateService: TranslateService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve, reject) => {
      this.panelService.$loading.next(true);
      this.authRepository.isLogin().subscribe({
        next: res => {
          this.panelService.$loading.next(false);
          if (!res.success) {
            this.gotoLoginPage();
          }
          this.panelService.$userInfo.next(res.data);

          resolve(res.success);
          if (res.success && res.data) {
            this.handleMessage(res.data)
          }
        },
        error: e => {
          this.panelService.$loading.next(false);
          this.messageService.danger(this.translateService.instant('message.authentication-failed'));
          reject(e);
        }
      })
    })
  }

  private handleMessage(user: any) {

    const messageHash = localStorage.getItem('user-message');
    if (user.message && CryptoUtil.hashCode(user.message).toString() != messageHash) {
      setTimeout(() => {
        this.dialogService.open({
          title: 'پیام از طرف مدیر',
          width: '100%',
          maxWidth: '500px',
          position: 'middle-center',
          context: {user: user},
          component: IdentityMessageComponent
        });
      }, 1000)
    }
  }

  private async gotoLoginPage() {
    await this.router.navigate(['/auth']);
  }
}
