import {Injectable, Injector} from '@angular/core';
import {BaseApiRepository, PagedListResult, QueryResult} from "@framework";
import {Observable} from "rxjs";
import {AuthMethod} from "../contracts";


@Injectable({providedIn: 'root'})
export class OtpRepository extends BaseApiRepository {

  constructor(injector: Injector) {
    super(injector, 'Otps');
  }

  send(req: {value: string, method: AuthMethod}) {
    return this.http.post<QueryResult<string>>(``, req);
  }

}
