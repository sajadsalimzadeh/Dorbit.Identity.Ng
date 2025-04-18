import {Injectable, Injector} from '@angular/core';
import {BaseApiRepository, BaseWriteRepository} from "@framework";
import {Token} from "@angular/compiler";

@Injectable({providedIn: 'root'})
export class RoleRepository extends BaseWriteRepository {

  constructor(injector: Injector) {
    super(injector, 'Roles');
  }
}
