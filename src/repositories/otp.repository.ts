import {Injectable, Injector} from '@angular/core';
import {OtpType} from "../contracts/auth";
import {BASE_URL_IDENTITY} from "../configs";
import {BaseApiRepository} from '@framework/repositories/base-api.repository';
import {QueryResult} from '@framework/contracts/results';

@Injectable({providedIn: 'root'})
export class OtpRepository extends BaseApiRepository {

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_URL_IDENTITY), 'Otps');
    }

    getAll() {
        return this.http.get<QueryResult<any[]>>('')
    }

    send(req: { receiver: string, type: OtpType }) {
        return this.http.post<QueryResult<string>>(``, req);
    }

}
