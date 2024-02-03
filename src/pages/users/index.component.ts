import {Component, Inject, Injector, Optional} from '@angular/core';
import {Observable, tap} from "rxjs";
import {debounce, ODataQueryOptions, PagedListResult} from "@framework";
import {UserRepository} from "../../repositories/user.repository";
import {BaseDataComponent} from "@panel";
import {USER_OPTION, UserOption} from "./options";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'page-identity-users',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends BaseDataComponent {

  searchControl = new FormControl('');

  constructor(
    injector: Injector,
    private userRepository: UserRepository,
    @Inject(USER_OPTION) @Optional() protected userOptions: UserOption[]
  ) {
    super(injector, userRepository);
  }

  override ngOnInit() {
    super.ngOnInit();

    this.subscription.add(this.searchControl.valueChanges.subscribe(e => {
      debounce(() => this.load(), 300);
    }));
  }

  protected override loader(query: ODataQueryOptions): Observable<PagedListResult> {
    query.filterBy('or', [
      {key: `name`, op: 'like', value: this.searchControl.value},
      {key: `username`, op: 'like', value: this.searchControl.value}
    ]);
    return this.repository.select(query).pipe(tap(res => {
      res.data?.forEach(x => {
        x.isAdmin = x.accesses?.map((x: string) => x.toLowerCase())?.includes('admin')
      })
    }));
  }

  deActive(item: any) {
    return this.userRepository.deActive(item.id).subscribe(res => {
      this.load();
    });
  }

  active(item: any) {
    return this.userRepository.active(item.id).subscribe(res => {
      this.load();
    });
  }

  showUserOption(option: UserOption, item: any) {
    this.showDialogByComponent(option.component, {user: item}, option.dialog);
  }
}
