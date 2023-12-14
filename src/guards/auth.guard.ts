import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthRepository} from "../repositories/auth.repository";
import {IdentityModule} from "@identity";
import {PanelService} from "../../../panel/src/services/panel.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private authRepository: AuthRepository,
    private panelService: PanelService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve, reject) => {
      this.authRepository.isLogin().subscribe({
        next: res => {
          if (!res.success) {
            this.gotoLoginPage();
          }
          this.panelService.$userInfo.next(res.data);
          resolve(res.success);
        },
        error: e => {
          this.gotoLoginPage();
          reject(e)
        }
      })
    })
  }

  private async gotoLoginPage() {
    await this.router.navigate([IdentityModule.configs.loginPath]);
  }
}
