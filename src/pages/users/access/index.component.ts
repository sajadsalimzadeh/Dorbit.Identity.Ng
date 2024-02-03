import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {BaseComponent} from "@framework";
import {AccessRepository, PrivilegeSaveRequest, UserRepository} from "../../../repositories";

@Component({
  selector: 'app-access',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class AccessComponent extends BaseComponent {

  @Input({required: true}) model: any;

  @Output() onComplete = new EventEmitter<void>();

  accesses: any[] = [];
  privilegeAccesses: string[] = [];

  constructor(injector: Injector, private accessRepository: AccessRepository, private userRepository: UserRepository) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();

    this.accessRepository.getAll().subscribe(res => {
      this.accesses = res.data ?? [];
      this.process();
    });

    this.load();
  }

  load() {
    this.userRepository.getPrivileges(this.model.id).subscribe(res => {
      this.privilegeAccesses = res.data ?? [];
      this.process();
    });
  }

  save() {
    const req: PrivilegeSaveRequest = { accesses: this.accesses.filter(x => x.checked).map(x => x.name) };
    this.userRepository.savePrivileges(this.model.id, req).subscribe(res => {
      this.onComplete.emit();
    });
  }

  process() {
    this.accesses.forEach(x => {
        x.checked = this.privilegeAccesses.includes(x.name.toLowerCase());
    });
  }
}
