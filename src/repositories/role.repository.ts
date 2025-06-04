import {Injectable, Injector} from '@angular/core';
import {BASE_URL_IDENTITY} from "../identity";
import {BaseCrudRepository} from '@framework/repositories/base-crud.repository';

@Injectable({providedIn: 'root'})
export class RoleRepository extends BaseCrudRepository {

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_URL_IDENTITY), 'Roles');
    }
}
