import {Injectable, Injector} from '@angular/core';
import {BaseApiRepository, QueryResult} from "@framework";
import {AuthLoginResponse, AuthRegisterRequest, LoginRequest, LoginWithCodeRequest, UserDto, UserLoginResponse} from "../contracts";
import {BehaviorSubject, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthRepository extends BaseApiRepository {

  $loading = new BehaviorSubject<boolean>(false);
  $user = new BehaviorSubject<UserDto | undefined>(undefined);
  $accesses = new BehaviorSubject<string[]>([]);
  $login = new BehaviorSubject<UserLoginResponse | undefined>(undefined);

  constructor(injector: Injector) {
    super(injector, 'Auth');
  }

  isLogin() {
    this.$loading.next(true);
    return this.http.get<QueryResult<UserDto>>('IsLogin').pipe(tap({
      next: res => {
        this.$loading.next(false);
        this.$user.next(res.data);
        this.$accesses.next(res.data?.accesses ?? []);
      },
      error: err => {
        this.$loading.next(false);
      }
    }));
  }

  login(request: LoginRequest) {
    return this.http.post<QueryResult<UserLoginResponse>>('Login', request);
  }

  loginWithCode(request: LoginWithCodeRequest) {
    return this.http.post<QueryResult<UserLoginResponse>>('LoginWithCode', request);
  }

  register(req: AuthRegisterRequest) {
    return this.http.post<QueryResult<AuthLoginResponse>>('Register', req)
  }

  logout() {
    return this.http.delete<QueryResult>('Logout');
  }
}
