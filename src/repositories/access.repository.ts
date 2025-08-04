import {Injectable, Injector} from '@angular/core';
import {BASE_URL_IDENTITY} from "../configs";
import {BaseApiRepository} from '@framework/repositories/base-api.repository';
import {QueryResult} from '@framework/contracts/results';
import { Access } from '../contracts/access';

@Injectable({providedIn: 'root'})
export class AccessRepository extends BaseApiRepository {

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_URL_IDENTITY), 'Accesses');
    }

    getAll() {
        return this.http.get<QueryResult<Access[]>>('')
    }
}
