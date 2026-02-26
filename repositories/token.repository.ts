import {Injectable, Injector} from '@angular/core';
import {Token} from "@angular/compiler";
import {BASE_API_URL_IDENTITY} from "../configs";
import {BaseApiRepository} from '@framework/repositories/base-api.repository';

@Injectable({providedIn: 'root'})
export class TokenRepository extends BaseApiRepository {


    constructor(injector: Injector) {
        super(injector, injector.get(BASE_API_URL_IDENTITY), 'Tokens');
    }

    terminate(id: string) {
        return this.http.post<Token>(`${id}/terminate`, {});
    }
}
