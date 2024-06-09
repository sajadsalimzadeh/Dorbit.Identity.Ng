import {Component, Directive, Inject, Injector, Optional, TemplateRef, ViewChild} from '@angular/core';
import {Observable, Subject, tap} from "rxjs";
import {debounce, ODataQueryOptions, PagedListResult} from "@framework";
import {UserRepository} from "../../repositories/user.repository";
import {BaseDataComponent} from "@panel";
import {USER_OPTION, UserOption} from "./options";
import {FormControl, FormGroup} from "@angular/forms";

@Directive()
export class BaseUsersComponent extends BaseDataComponent {

  @ViewChild('filterTpl') filterTpl!: TemplateRef<any>;

  filterForm = new FormGroup({
    search: new FormControl(''),
    code: new FormControl(''),
  });

  $items = new Subject<any[]>();

  constructor(
    injector: Injector,
    private userRepository: UserRepository
  ) {
    super(injector, userRepository);
  }

  override ngOnInit() {
    super.ngOnInit();

    this.subscription.add(this.filterForm.valueChanges.subscribe(e => {
      debounce(() => this.load(), 300);
    }));
  }

  protected override loader(query: ODataQueryOptions): Observable<PagedListResult> {
    return this.userRepository.search(this.filterForm.value as any).pipe(tap(res => {
      const items = res.data ?? [];
      items.forEach(x => {
        x.isAdmin = x.accesses?.map((x: string) => x.toLowerCase())?.includes('admin')
      });
      this.$items.next(items);
    }));
  }

  active(item: any) {
    this.dialogService.prompt({title: 'فعال کردن'}, {position: 'top-center', maskClosable: true}).then(e => {
      if (!e.result) return;
      return this.userRepository.active({id: item.id, message: e.value}).subscribe(res => {
        this.load();
        e.dialog.close();
      });
    })
  }

  deActive(item: any) {
    this.dialogService.prompt({title: 'غیرفعال کردن'}, {position: 'top-center', maskClosable: true}).then(e => {
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
    this.dialogService.prompt({title: 'تنظیم پیام کاربر', value: item.message}, {position: 'top-center', maskClosable: true}).then(e => {
      if (e.result) {
        this.userRepository.setMessage({id: item.id, message: e.value}).subscribe(res => {
          this.load();
          e.dialog.close();
        });
      }
    });
  }
}

@Component({
  selector: 'page-identity-users',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends BaseUsersComponent {

  constructor(injector: Injector, userRepository: UserRepository,
              @Inject(USER_OPTION) @Optional() protected userOptions: UserOption[]) {
    super(injector, userRepository);
  }
}
