import {Injectable, Injector} from '@angular/core';
import {BASE_API_URL_IDENTITY} from "../configs";
import {BaseCrudRepository} from '@framework/repositories/base-crud.repository';
import { Role, RoleMinimal } from '@identity/contracts/role';
import { QueryResult } from '@framework/contracts/results';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RoleRepository extends BaseCrudRepository<Role> {

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_API_URL_IDENTITY), 'Roles');
    }

    getAllMinimal(): Observable<QueryResult<RoleMinimal[]>> {
        return this.http.get<QueryResult<RoleMinimal[]>>('Minimal');
    }
}
