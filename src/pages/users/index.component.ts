import {Component, Inject, Injector} from '@angular/core';
import {ODataQueryOptions, PagedListResult} from "@framework";
import {UserRepository} from "../../repositories/user.repository";
import {BaseDataComponent} from "@panel";
import {Observable} from "rxjs";
import {USER_OPTION, UserOption} from "./options";

@Component({
  selector: 'page-identity-users',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends BaseDataComponent {

  constructor(
    injector: Injector,
    repository: UserRepository,
    @Inject(USER_OPTION) protected userOptions: UserOption[]
    ) {
    super(injector, repository);
    console.log(userOptions)
  }

  protected override loader(query: ODataQueryOptions): Observable<PagedListResult> {
    return this.repository.select(query);
  }
}
