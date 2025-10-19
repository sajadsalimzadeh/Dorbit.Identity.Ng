import { Injectable, Injector } from '@angular/core';
import { tap } from "rxjs";
import { BASE_URL_IDENTITY } from "../configs";
import { BaseApiRepository } from '@framework/repositories/base-api.repository';
import { QueryResult } from '@framework/contracts/results';
import { CaptchaValidateRequest } from '@framework/contracts/captcha';
import {
    AuthForgetPasswordRequest,
    AuthLoginResponse,
    AuthLoginWithGoogleRequest,
    AuthLoginWithPasswordRequest,
    AuthRegisterRequest,
    IdentityDto,
    LoginWithCodeRequest
} from '../contracts/auth';

@Injectable({ providedIn: 'root' })
export class AuthRepository extends BaseApiRepository {

    identity!: IdentityDto;

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_URL_IDENTITY), 'Auth');
    }

    getLoginInfo(params?: { firebaseToken?: string }) {
        return this.http.get<QueryResult<IdentityDto>>('', { params: params ?? {} }).pipe(tap({
            next: res => {
                if (res.data) {
                    this.identity = res.data;
                }
            },
        }));
    }

    loginWithPassword(request: AuthLoginWithPasswordRequest, captchaReq: CaptchaValidateRequest) {
        return this.http.post<QueryResult<AuthLoginResponse>>('LoginWithPassword', request, {
            headers: {
                'Captcha': `${captchaReq.key} ${captchaReq.value}`
            }
        });
    }


    loginWithGoogle(request: AuthLoginWithGoogleRequest) {
        return this.http.post<QueryResult<AuthLoginResponse>>('LoginWithGoogle', request);
    }

    loginWithOtp(request: LoginWithCodeRequest) {
        return this.http.post<QueryResult<AuthLoginResponse>>('LoginWithOtp', request);
    }

    register(req: AuthRegisterRequest) {
        return this.http.post<QueryResult<AuthLoginResponse>>('Register', req)
    }

    forgetPassword(req: AuthForgetPasswordRequest) {
        return this.http.post<QueryResult<AuthLoginResponse>>('ForgetPassword', req);
    }

    logout() {
        return this.http.delete<QueryResult>('Logout');
    }
}
