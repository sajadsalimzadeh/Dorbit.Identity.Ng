import {Component, Injector} from '@angular/core';
import {Observable} from "rxjs";
import {BaseDataComponent, BaseDataViewComponent} from "@framework";
import {ODataQueryOptions, PagedListResult} from "@framework";
import {AccessRepository} from "../../repositories";

@Component({
    selector: 'page-identity-accesses',
    templateUrl: 'index.component.html',
    styleUrls: ['./index.component.scss'],
    standalone: false
})
export class IndexComponent extends BaseDataViewComponent {

  constructor(injector: Injector, private repository: AccessRepository) {
    super(injector);
  }

  protected override loader(query: ODataQueryOptions): Observable<PagedListResult> {
    query.orderBy('Name')
    return this.repository.getAll() as Observable<PagedListResult>;
  }
}
