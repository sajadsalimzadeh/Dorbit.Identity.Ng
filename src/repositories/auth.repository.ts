import {Injectable, Injector} from '@angular/core';
import {BaseApiRepository, CommandResult, QueryResult} from "@framework";
import {LoginRequest, UserDto, UserLoginResponse} from "../contracts";
import {BehaviorSubject, tap} from "rxjs";
import {PanelService} from "@panel";

@Injectable({providedIn: 'root'})
export class AuthRepository extends BaseApiRepository {

  $user = new BehaviorSubject<UserDto | undefined>(undefined);

  constructor(injector: Injector, private panelService: PanelService) {
    super(injector, 'Auth');
  }

  login(request: LoginRequest) {
    return this.http.post<QueryResult<UserLoginResponse>>('Login', request);
  }

  logout() {
    return this.http.delete<QueryResult>('Logout');
  }

  isLogin() {
    return this.http.get<QueryResult<UserDto>>('IsLogin').pipe(tap(res => {
      this.$user.next(res.data);
      this.panelService.$accesses.next(res.data?.accesses ?? []);
    }));
  }
}
