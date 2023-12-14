import {Injectable, Injector} from '@angular/core';
import {BaseWriteRepository, CommandResult, QueryResult} from "@framework";

export interface PrivilegeSaveRequest {
  startTime?: string;
  endTime?: string;
  accesses: string[];
}

@Injectable({providedIn: 'root'})
export class UserRepository extends BaseWriteRepository {

  constructor(injector: Injector) {
    super(injector, 'Users');
  }

  changePassword(req: any) {
    return this.http.post<CommandResult>('ChangePassword', req);
  }

  getPrivileges(id: string) {
    return this.http.get<QueryResult<string[]>>(`${id}/Privileges`);
  }

  savePrivileges(id: string, request: PrivilegeSaveRequest) {
    return this.http.post<QueryResult<string[]>>(`${id}/Privileges`, request);
  }
}
