import {Injectable, Injector} from '@angular/core';
import {BaseWriteRepository} from "@dorbit";

@Injectable({providedIn: 'root'})
export class AccessRepository extends BaseWriteRepository {

  constructor(injector: Injector) {
    super(injector, 'Accesses');
  }

}
