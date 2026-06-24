import { Injectable, Injector } from '@angular/core';
import { Observable, tap } from "rxjs";
import { UserBase, UserEditRequest, UserMinimal, UserPrivilege, UserVerifyRequest } from "../contracts/user";
import { BASE_API_URL_IDENTITY } from "../configs";
import { BaseCrudRepository } from '@framework/repositories/base-crud.repository';
import { CommandResult, PagedListResult, QueryResult } from '@framework/contracts/results';
import { ODataQueryOptions } from '@framework/contracts/odata-query-options';
import { IdentityDto } from '../contracts/auth';
import { NotificationDto, UserNotifySubscriptionRequest } from '@identity/contracts/notification';
import { UserPrivilegeSaveRequest } from '@identity/contracts/privilege';

@Injectable({ providedIn: 'root' })
export class UserBaseRepository extends BaseCrudRepository {

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_API_URL_IDENTITY), 'Users');
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

    getAllMinimal(): Observable<QueryResult<UserMinimal[]>> {
        return this.http.get<QueryResult<UserMinimal[]>>('Minimal');
    }

    deActive(id: string, req: any) {
        return this.http.post<QueryResult<string[]>>(`${id}/DeActive`, req);
    }

    active(id: string, req: any) {
        return this.http.post<QueryResult<string[]>>(`${id}/Active`, req);
    }

    resetPassword(id: string, req: { password: string, isSendMessage?: boolean }) {
        return this.http.post<CommandResult>(`${id}/ResetPassword`, req);
    }

    setMessage(id: string, req: { message: string }) {
        return this.http.post<QueryResult>(`${id}/Message`, req);
    }

    getAllPrivilege(id: string) {
        return this.http.get<QueryResult<UserPrivilege[]>>(`${id}/Privileges`)
    }

    savePrivileges(id: string, request: UserPrivilegeSaveRequest) {
        return this.http.post<QueryResult<UserPrivilege>>(`${id}/Privileges`, request);
    }

    deletePrivilege(id: string, privilegeId: string) {
        return this.http.delete<CommandResult>(`${id}/Privileges/${privilegeId}`);
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
        return this.http.get<QueryResult<UserBase>>('Own');
    }

    ownChangePassword(req: any) {
        return this.http.post<CommandResult>('Own/ChangePassword', req);
    }

    editOwn(req: UserEditRequest) {
        return this.http.patch<QueryResult<IdentityDto>>('Own', req);
    }

    setOwnNotifySubscription(req: UserNotifySubscriptionRequest) {
        return this.http.post<CommandResult>('Own/NotifySubscription', req);
    }

    verifyOwn(req: UserVerifyRequest) {
        return this.http.post<CommandResult>('Own/Verify', req);
    }
}
