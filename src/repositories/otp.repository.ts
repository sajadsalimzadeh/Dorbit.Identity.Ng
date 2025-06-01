import {Injectable, Injector} from '@angular/core';
import {BaseApiRepository, QueryResult} from "@framework";
import {OtpType} from "../contracts/_public";
import {BASE_URL_IDENTITY} from "../identity";


@Injectable({providedIn: 'root'})
export class OtpRepository extends BaseApiRepository {

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_URL_IDENTITY), 'Otps');
    }

    send(req: { receiver: string, type: OtpType }) {
        return this.http.post<QueryResult<string>>(``, req);
    }

}
