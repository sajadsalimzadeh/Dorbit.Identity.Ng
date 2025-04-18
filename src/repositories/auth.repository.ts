import {Injectable, Injector} from '@angular/core';
import {BaseApiRepository, QueryResult} from "@framework";
import {AuthLoginResponse, AuthLoginWithStaticPasswordRequest, AuthRegisterRequest, LoginWithCodeRequest, UserDto} from "../contracts";
import {BehaviorSubject, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthRepository extends BaseApiRepository {

  $loading = new BehaviorSubject<boolean>(false);
  $user = new BehaviorSubject<UserDto | undefined>(undefined);
  $accesses = new BehaviorSubject<string[]>([]);

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

  loginWithStaticPassword(request: AuthLoginWithStaticPasswordRequest) {
    return this.http.post<QueryResult<AuthLoginResponse>>('Login', request);
  }

  loginWithOtp(request: LoginWithCodeRequest) {
    return this.http.post<QueryResult<AuthLoginResponse>>('LoginWithCode', request);
  }

  register(req: AuthRegisterRequest) {
    return this.http.post<QueryResult<AuthLoginResponse>>('Register', req)
  }

  logout() {
    return this.http.delete<QueryResult>('Logout');
  }
}
