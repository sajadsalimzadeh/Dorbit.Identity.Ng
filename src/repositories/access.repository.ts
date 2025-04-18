import {Injectable, Injector} from '@angular/core';
import {BaseApiRepository, QueryResult} from "@framework";

@Injectable({providedIn: 'root'})
export class AccessRepository extends BaseApiRepository {

  constructor(injector: Injector) {
    super(injector, 'Accesses');
  }

  getAll() {
    return this.http.get<QueryResult<any[]>>('')
  }
}
