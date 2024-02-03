import {Injectable, Injector} from '@angular/core';
import {BaseApiRepository, CommandResult, QueryResult} from "@framework";
import {LoginRequest, LoginWithCodeRequest, UserDto, UserLoginResponse} from "../contracts";
import {BehaviorSubject, tap} from "rxjs";
import {PanelService} from "@panel";
import {AuthService} from "../services";

@Injectable({providedIn: 'root'})
export class AuthRepository extends BaseApiRepository {

  constructor(injector: Injector, private authService: AuthService) {
    super(injector, 'Auth');
  }

  login(request: LoginRequest) {
    return this.http.post<QueryResult<UserLoginResponse>>('Login', request);
  }

  loginWithCode(request: LoginWithCodeRequest) {
    return this.http.post<QueryResult<UserLoginResponse>>('LoginWithCode', request);
  }

  logout() {
    return this.http.delete<QueryResult>('Logout');
  }

  isLogin() {
    return this.http.get<QueryResult<UserDto>>('IsLogin').pipe(tap(res => {
      this.authService.$user.next(res.data);
    }));
  }
}
