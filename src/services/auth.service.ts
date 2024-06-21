import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserDto, UserLoginResponse} from "../contracts";
import {PanelService} from "@panel";

@Injectable({providedIn: 'root'})
export class AuthService {

  $user = new BehaviorSubject<UserDto | undefined>(undefined);
  $accesses = new BehaviorSubject<string[]>([]);
  $login = new BehaviorSubject<UserLoginResponse | undefined>(undefined);

  constructor(private panelService: PanelService) {

    this.$user.subscribe(e => {

      this.$accesses.next((e?.accesses ?? []).map(x => x.toLowerCase()));
      this.panelService.$accesses.next(this.$accesses.value);
    })
  }

  isLogin() {
    return !!this.$user.value;
  }

  hasAccess(access: string) {
    return this.$accesses.value.includes(access.toLowerCase());
  }
}
