import {Inject, Injectable, Injector} from '@angular/core';
import {BaseWriteRepository} from "@framework";
import {BASE_IDENTITY_URL} from "../identity";

@Injectable({providedIn: 'root'})
export class RoleRepository extends BaseWriteRepository {

  constructor(injector: Injector) {
    super(injector, injector.get(BASE_IDENTITY_URL), 'Roles');
  }
}
