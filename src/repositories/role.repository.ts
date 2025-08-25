import {Injectable, Injector} from '@angular/core';
import {BASE_URL_IDENTITY} from "../configs";
import {BaseCrudRepository} from '@framework/repositories/base-crud.repository';
import { Role } from '@identity/contracts/role';

@Injectable({providedIn: 'root'})
export class RoleRepository extends BaseCrudRepository<Role> {

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_URL_IDENTITY), 'Roles');
    }
}
