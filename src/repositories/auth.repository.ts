import {Injectable, Injector} from '@angular/core';
import {
    AuthLoginResponse,
    AuthLoginWithPasswordRequest,
    AuthRegisterRequest,
    IdentityDto,
    LoginWithCodeRequest
} from "../contracts/_public";
import {BehaviorSubject, tap} from "rxjs";
import {BASE_URL_IDENTITY} from "../identity";
import {BaseApiRepository} from '@framework/repositories/base-api.repository';
import {QueryResult} from '@framework/contracts/results';
import {CaptchaValidateRequest} from '@framework/contracts/captcha';

@Injectable({providedIn: 'root'})
export class AuthRepository extends BaseApiRepository {

    $loading = new BehaviorSubject<boolean>(false);
    $identity = new BehaviorSubject<IdentityDto | undefined>(undefined);

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_URL_IDENTITY), 'Auth');
    }

    getLoginInfo() {
        this.$loading.next(true);
        return this.http.get<QueryResult<IdentityDto>>('').pipe(tap({
            next: res => {
                this.$loading.next(false);
                this.$identity.next(res.data);
            },
            error: err => {
                this.$loading.next(false);
            }
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
