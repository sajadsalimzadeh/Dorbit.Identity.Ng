import {Injectable, Injector} from '@angular/core';
import {BaseCrudRepository} from "@framework";
import {BASE_IDENTITY_URL} from "../identity";

@Injectable({providedIn: 'root'})
export class RoleRepository extends BaseCrudRepository {

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_IDENTITY_URL), 'Roles');
    }
}
