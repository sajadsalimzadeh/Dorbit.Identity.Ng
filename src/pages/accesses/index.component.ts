import {Component, Injector} from '@angular/core';
import {Observable} from "rxjs";
import {BaseDataComponent} from "@panel";
import {ODataQueryOptions, PagedListResult} from "@framework";
import {AccessRepository} from "../../repositories";

@Component({
  selector: 'page-identity-accesses',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends BaseDataComponent {

  constructor(injector: Injector, repository: AccessRepository) {
    super(injector, repository);
  }

  protected override loader(query: ODataQueryOptions): Observable<PagedListResult> {
    query.setOrder('Name')
    return this.repository.select(query);
  }
}
