import { Injectable, Injector } from '@angular/core';
import { Observable, tap } from "rxjs";
import { UserEditRequest } from "../contracts/user";
import { BASE_URL_IDENTITY } from "../configs";
import { BaseCrudRepository } from '@framework/repositories/base-crud.repository';
import { CommandResult, PagedListResult, QueryResult } from '@framework/contracts/results';
import { ODataQueryOptions } from '@framework/contracts/odata-query-options';
import { IdentityDto } from '../contracts/auth';
import { NotificationDto } from '@identity/contracts/notification';
import { PrivilegeSaveRequest } from '@identity/contracts/privilege';

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

    getAllPrivilege(id: string) {
        return this.http.get<QueryResult<any[]>>(`${id}/Privileges`)
    }

    savePrivileges(id: string, request: PrivilegeSaveRequest) {
        return this.http.post<QueryResult<string[]>>(`${id}/Privileges`, request);
    }

    deletePrivilege(id: string, privilegeId: string) {
        return this.http.delete<QueryResult<string[]>>(`${id}/Privileges/${privilegeId}`);
    }

    getAllToken(id: string) {
        return this.http.get<QueryResult<any[]>>(`${id}/Tokens`)
    }

    sendNotification(id: string, notification: NotificationDto) {
        return this.http.post<CommandResult>(`${id}/Notifications`, notification);
    }

    sendAllNotification(ids: string[], notification: NotificationDto) {
        return this.http.post<CommandResult>(`Notifications`, { userIds: ids, notification: notification });
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

    setOwnWebPushSubscription(req: any) {
        return this.http.post<CommandResult>('Own/WebPushSubscription', req);
    }
}
