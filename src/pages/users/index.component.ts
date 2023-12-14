import {Component, Injector} from '@angular/core';
import {ODataQueryOptions, PagedListResult} from "@dorbit";
import {UserRepository} from "../../repositories/user.repository";
import {BaseDataComponent} from "@panel";
import {Observable} from "rxjs";

@Component({
  selector: 'page-identity-users',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends BaseDataComponent {

  constructor(injector: Injector, repository: UserRepository) {
    super(injector, repository);
  }

  protected override loader(query: ODataQueryOptions): Observable<PagedListResult> {
    return this.repository.select(query);
  }
}
