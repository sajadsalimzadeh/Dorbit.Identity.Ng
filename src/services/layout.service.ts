import {Injectable} from '@angular/core';
import {BaseLayoutService, MenuItem} from "../../../panel/src/services/base-layout.service";
import {IdentityModule} from "../index";

@Injectable()
export class LayoutService extends BaseLayoutService {

  async getMainMenus(): Promise<MenuItem[]> {
    return [
      {
        icon: 'fal fa-user-group-simple', text: 'سیستم مدیریت کاربران', children: [
          {text: 'کاربران سیستم', link: `/${IdentityModule.route_prefix}/users`},
          {text: 'دسترسی ها', link: `/${IdentityModule.route_prefix}/accesses`},
        ]
      },
    ];
  }

  override async getProfileMenus(): Promise<MenuItem[]> {
    return [
      {icon: 'fal fa-key', text: 'تغییر کلمه عبور', link: `/${IdentityModule.route_prefix}/change-password`},
    ];
  }

}
