import {Injectable, Injector} from '@angular/core';
import {BaseWriteRepository, CommandResult, ODataQueryOptions, PagedListResult, QueryResult} from "@framework";
import {Observable, tap} from "rxjs";
import {query} from "@angular/animations";

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

  override select(query?: ODataQueryOptions): Observable<PagedListResult> {
    return super.select(query);
  }

  override getAll(): Observable<PagedListResult> {
    return super.getAll().pipe(tap(res => {
      res.data?.forEach(x => {
        x.value = x.id;
        x.text = `${x.name} (${x.username})`;
      })
    }));
  }

  getOwn() {
    return this.http.get<QueryResult>('Own');
  }

  changePassword(req: any) {
    return this.http.post<CommandResult>('ChangePassword', req);
  }

  editOwn(req: any) {
    return this.http.patch<QueryResult>('Own', req);
  }

  getPrivileges(id: string) {
    return this.http.get<QueryResult<string[]>>(`${id}/Privileges`);
  }

  savePrivileges(id: string, request: PrivilegeSaveRequest) {
    return this.http.post<QueryResult<string[]>>(`${id}/Privileges`, request);
  }

  deActive(id: string) {
    return this.http.post<QueryResult<string[]>>(`${id}/DeActive`, {});
  }

  active(id: string) {
    return this.http.post<QueryResult<string[]>>(`${id}/Active`, {});
  }
}
