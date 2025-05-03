import {Inject, Injectable, Injector} from '@angular/core';
import {BaseApiRepository, QueryResult} from "@framework";
import {OtpType} from "../contracts/_public";
import {BASE_IDENTITY_URL} from "../identity";


@Injectable({providedIn: 'root'})
export class OtpRepository extends BaseApiRepository {

  constructor(injector: Injector) {
    super(injector, injector.get(BASE_IDENTITY_URL), 'Otps');
  }

  send(req: {receiver: string, type: OtpType}) {
    return this.http.post<QueryResult<string>>(``, req);
  }

}
