import { Injectable, Injector } from '@angular/core';
import { Observable, tap } from "rxjs";
import { UserEditRequest } from "../contracts/user";
import { BASE_URL_IDENTITY } from "../configs";
import { BaseCrudRepository } from '@framework/repositories/base-crud.repository';
import { CommandResult, PagedListResult, QueryResult } from '@framework/contracts/results';
import { ODataQueryOptions } from '@framework/contracts/odata-query-options';
import { IdentityDto } from '../contracts/auth';
import { UserSendNotificationRequest } from '@identity/contracts/notification';

export interface PrivilegeSaveRequest {
    startTime?: string;
    endTime?: string;
    accesses: string[];
}

@Injectable({ providedIn: 'root' })
export class UserRepository extends BaseCrudRepository {

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_URL_IDENTITY), 'Users');
    }

    override select(query?: ODataQueryOptions): Observable<PagedListResult> {
        return super.select(query);
    }

    search(req: { search: any, code: any }): Observable<PagedListResult> {
        return this.http.get<PagedListResult>(`Search`, { params: req });
    }

    override getAll(): Observable<QueryResult<any[]>> {
        return super.getAll().pipe(tap(res => {
            res.data?.forEach(x => {
                x.text = `${x.name} (${x.username})`;
            })
        }));
    }

    getAllPrivilege(id: string) {
        return this.http.get<QueryResult<any[]>>(`${id}/Privileges`)
    }

    getAllToken(id: string) {
        return this.http.get<QueryResult<any[]>>(`${id}/Tokens`)
    }

    savePrivileges(id: string, request: PrivilegeSaveRequest) {
        return this.http.post<QueryResult<string[]>>(`${id}/Privileges`, request);
    }

    deActive(req: any) {
        return this.http.post<QueryResult<string[]>>(`${req.id}/DeActive`, req);
    }

    active(req: any) {
        return this.http.post<QueryResult<string[]>>(`${req.id}/Active`, req);
    }

    resetPassword(req: any) {
        return this.http.post<CommandResult>(`${req.id}/ResetPassword`, req);
    }

    setMessage(req: any) {
        return this.http.post<QueryResult>(`${req.id}/Message`, req);
    }

    sendNotification(id: string, req: UserSendNotificationRequest) {
        return this.http.post<CommandResult>(`${id}/Notifications`, req);
    }

    sendNotificationOdata(query: ODataQueryOptions, req: UserSendNotificationRequest) {
        return this.http.post<CommandResult>('odata/Notifications', req, { params: query as any });
    }

    getOwn() {
        return this.http.get<QueryResult>('Own');
    }

    ownChangePassword(req: any) {
        return this.http.post<CommandResult>('Own/ChangePassword', req);
    }

    editOwn(req: UserEditRequest) {
        return this.http.patch<QueryResult<IdentityDto>>('Own', req);
    }

    setOwnWebPushToken(req: any) {
      return this.http.post<CommandResult>('Own/WebPushToken', req);
    }
}
