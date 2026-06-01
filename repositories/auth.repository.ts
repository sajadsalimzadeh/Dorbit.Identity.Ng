import { Injectable, Injector } from '@angular/core';
import { tap } from "rxjs";
import { BASE_API_URL_IDENTITY } from "../configs";
import { BaseApiRepository } from '@framework/repositories/base-api.repository';
import { QueryResult } from '@framework/contracts/results';
import { CaptchaValidateRequest } from '@framework/contracts/captcha';
import {
    AuthForgetPasswordRequest,
    AuthLoginResponse,
    AuthLoginWithAppleRequest,
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
        super(injector, injector.get(BASE_API_URL_IDENTITY), 'Auth');
    }

    hasAccess(access: string | string[]) {
        if(this.identity.isFullAccess) return true;
        if(typeof access === 'string') {
            access = access.toLowerCase();
            return this.identity.accessibility.some(x => x == access);
        } else {
            return access.some(x => this.identity.accessibility.some(y => y.toLowerCase() == x.toLowerCase()));
        }
    }

    getLoginInfo(params?: { firebaseToken?: string }) {
        return this.http.get<QueryResult<IdentityDto>>('', { params: params ?? {} });
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

    loginWithApple(request: AuthLoginWithAppleRequest) {
      return this.http.post<QueryResult<AuthLoginResponse>>('LoginWithApple', request);
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
