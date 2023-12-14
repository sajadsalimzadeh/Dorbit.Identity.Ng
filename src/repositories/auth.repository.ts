import {Injectable, Injector} from '@angular/core';
import {BaseApiRepository, CommandResult, QueryResult} from "@framework";
import {LoginRequest, UserDto, UserLoginResponse} from "../models";

@Injectable({providedIn: 'root'})
export class AuthRepository extends BaseApiRepository {

  constructor(injector: Injector) {
    super(injector, 'Auth');
  }

  login(request: LoginRequest) {
    return this.http.post<QueryResult<UserLoginResponse>>('Login', request);
  }

  logout() {
    return this.http.delete<QueryResult>('Logout');
  }

  isLogin() {
    return this.http.get<QueryResult<UserDto>>('IsLogin');
  }
}
