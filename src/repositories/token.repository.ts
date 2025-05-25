import {Injectable, Injector} from '@angular/core';
import {BaseApiRepository} from "@framework";
import {Token} from "@angular/compiler";
import {BASE_IDENTITY_URL} from "../identity";

@Injectable({providedIn: 'root'})
export class TokenRepository extends BaseApiRepository {


    constructor(injector: Injector) {
        super(injector, injector.get(BASE_IDENTITY_URL), 'Tokens');
    }

    terminate(id: string) {
        return this.http.post<Token>(`${id}/terminate`, {});
    }
}
