import {Injectable, Injector} from '@angular/core';
import {BaseApiRepository, QueryResult} from "@framework";
import {OtpType} from "../contracts";


@Injectable({providedIn: 'root'})
export class OtpRepository extends BaseApiRepository {

  constructor(injector: Injector) {
    super(injector, 'Otps');
  }

  send(req: {receiver: string, type: OtpType}) {
    return this.http.post<QueryResult<string>>(``, req);
  }

}
