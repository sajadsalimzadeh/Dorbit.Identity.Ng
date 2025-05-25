import {Injectable, Injector} from '@angular/core';
import {BaseApiRepository, QueryResult} from "@framework";
import {BASE_IDENTITY_URL} from "../identity";

@Injectable({providedIn: 'root'})
export class AccessRepository extends BaseApiRepository {

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_IDENTITY_URL), 'Accesses');
    }

    getAll() {
        return this.http.get<QueryResult<any[]>>('')
    }
}
