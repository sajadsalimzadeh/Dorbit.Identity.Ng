import {Injectable, Injector} from '@angular/core';
import {tap} from "rxjs";
import {BASE_URL_IDENTITY} from "../configs";
import {BaseApiRepository} from '@framework/repositories/base-api.repository';
import {QueryResult} from '@framework/contracts/results';
import {CaptchaValidateRequest} from '@framework/contracts/captcha';
import {
    AuthLoginResponse,
    AuthLoginWithPasswordRequest,
    AuthRegisterRequest,
    IdentityDto,
    LoginWithCodeRequest
} from '../contracts/auth';

@Injectable({providedIn: 'root'})
export class AuthRepository extends BaseApiRepository {

    identity!: IdentityDto;

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_URL_IDENTITY), 'Auth');
    }

    getLoginInfo() {
        return this.http.get<QueryResult<IdentityDto>>('').pipe(tap({
            next: res => {
                if(res.data) {
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

    loginWithOtp(request: LoginWithCodeRequest) {
        return this.http.post<QueryResult<AuthLoginResponse>>('LoginWithOtp', request);
    }

    register(req: AuthRegisterRequest) {
        return this.http.post<QueryResult<AuthLoginResponse>>('Register', req)
    }

    logout() {
        return this.http.delete<QueryResult>('Logout');
    }
}
