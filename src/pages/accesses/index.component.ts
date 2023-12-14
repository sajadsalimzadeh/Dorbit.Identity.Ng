import {Component, Injector} from '@angular/core';
import {BaseDataComponent} from "@panel";
import {AccessRepository} from "@identity";
import {ODataQueryOptions, PagedListResult} from "@dorbit";
import {Observable} from "rxjs";

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
    return this.repository.select(query);
  }
}
