import {Inject, Injectable, Injector} from '@angular/core';
import {BaseApiRepository, QueryResult} from "@framework";
import {AuthLoginResponse, AuthLoginWithStaticPasswordRequest, AuthRegisterRequest, LoginWithCodeRequest, IdentityUserDto} from "../contracts/_public";
import {BehaviorSubject, tap} from "rxjs";
import {BASE_IDENTITY_URL} from "../identity";

@Injectable({providedIn: 'root'})
export class AuthRepository extends BaseApiRepository {

  $loading = new BehaviorSubject<boolean>(false);
  $user = new BehaviorSubject<IdentityUserDto | undefined>(undefined);
  $accesses = new BehaviorSubject<string[]>([]);

  constructor(injector: Injector) {
    super(injector, injector.get(BASE_IDENTITY_URL), 'Auth');
  }

  isLogin() {
    this.$loading.next(true);
    return this.http.get<QueryResult<IdentityUserDto>>('IsLogin').pipe(tap({
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
