import {Component, Inject, Injector, Optional, TemplateRef, ViewChild} from '@angular/core';
import {Observable, tap} from "rxjs";
import {debounce, DialogRef, ODataQueryOptions, PagedListResult} from "@framework";
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

  @ViewChild('filterTpl') filterTpl!: TemplateRef<any>;

  filterDialog?: DialogRef;
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

  active(item: any) {
    this.dialogService.prompt({message: 'پیام برای کاربر'}, {title: 'فعال کردن'}).then(e => {
      if (!e.result) return;
      return this.userRepository.active({id: item.id, message: e.value}).subscribe(res => {
        this.load();
        e.dialog.close();
      });
    })
  }

  deActive(item: any) {
    this.dialogService.prompt({message: 'پیام برای کاربر'}, {title: 'غیرفعال کردن'}).then(e => {
      if (!e.result) return;
      return this.userRepository.deActive({id: item.id, message: e.value}).subscribe(res => {
        this.load();
        e.dialog.close();
      });
    })
  }

  showUserOption(option: UserOption, item: any) {
    this.showDialogByComponent(option.component, {user: item}, option.dialog);
  }

  showMessage(item: any) {
    this.dialogService.prompt({message: 'پیام برای کاربر', value: item.message}, {title: 'تنظیم پیام کاربر'}).then(e => {
      if (e.result) {
        this.userRepository.setMessage({id: item.id, message: e.value}).subscribe(res => {
          this.load();
          e.dialog.close();
        });
      }
    });
  }
}
