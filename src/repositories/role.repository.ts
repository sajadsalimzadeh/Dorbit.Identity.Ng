import {Injectable, Injector} from '@angular/core';
import {BaseCrudRepository} from "@framework";
import {BASE_URL_IDENTITY} from "../identity";

@Injectable({providedIn: 'root'})
export class RoleRepository extends BaseCrudRepository {

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_URL_IDENTITY), 'Roles');
    }
}
