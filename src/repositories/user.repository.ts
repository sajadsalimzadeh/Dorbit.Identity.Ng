import {Injectable, Injector} from '@angular/core';
import {BaseCrudRepository, CommandResult, ODataQueryOptions, PagedListResult, QueryResult} from "@framework";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {IdentityDto, UserEditRequest} from "../contracts/_public";
import {BASE_URL_IDENTITY} from "../identity";

export interface PrivilegeSaveRequest {
    startTime?: string;
    endTime?: string;
    accesses: string[];
}

@Injectable({providedIn: 'root'})
export class IdentityUserRepository extends BaseCrudRepository {
    $own = new BehaviorSubject<IdentityDto | undefined>(undefined)

    constructor(injector: Injector) {
        super(injector, injector.get(BASE_URL_IDENTITY), 'Users');
    }

    override select(query?: ODataQueryOptions): Observable<PagedListResult> {
        return super.select(query);
    }

    search(req: { search: any, code: any }): Observable<PagedListResult> {
        return this.http.get<PagedListResult>(`Search`, {params: req});
    }

    override getAll(): Observable<QueryResult<any[]>> {
        return super.getAll().pipe(tap(res => {
            res.data?.forEach(x => {
                x.text = `${x.name} (${x.username})`;
            })
        }));
    }

    getOwn() {
        return this.http.get<QueryResult>('Own').pipe(tap({
            next: res => {
                this.$own.next(res.data);
            }
        }));
    }

    ownChangePassword(req: any) {
        return this.http.post<CommandResult>('Own/ChangePassword', req);
    }

    resetPassword(req: any) {
        return this.http.post<CommandResult>(`${req.id}/ResetPassword`, req);
    }

    editOwn(req: UserEditRequest) {
        return this.http.patch<QueryResult<IdentityDto>>('Own', req);
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

    setMessage(req: any) {
        return this.http.post<QueryResult>(`${req.id}/Message`, req);
    }

}
