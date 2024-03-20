import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {UserRepository} from "../../../repositories";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BasePanelComponent} from "@panel";
import {IdentitySharedModule} from "../../../components";

@Component({
  standalone: true,
  imports: [IdentitySharedModule],
  selector: 'app-user-reset-password',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class UserResetPasswordComponent extends BasePanelComponent {

  @Input({required: true}) model: any;

  @Output() onComplete = new EventEmitter<void>();

  form = new FormGroup({
    password: new FormControl('', [Validators.required])
  })

  constructor(injector: Injector, private userRepository: UserRepository) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  save() {
    this.userRepository.resetPassword({id: this.model.id, ...this.form.value}).subscribe(res => {
      this.messages.success();
      this.onComplete.emit();
    });
  }
}
