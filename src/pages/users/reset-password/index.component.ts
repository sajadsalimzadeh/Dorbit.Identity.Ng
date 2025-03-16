import {Component, EventEmitter, Injector, Input, Output} from '@angular/core';
import {UserRepository} from "../../../repositories";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IdentitySharedModule} from "../../../components";
import {BaseComponent} from "@framework";

@Component({
  standalone: true,
  imports: [IdentitySharedModule],
  selector: 'app-user-reset-password',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class UserResetPasswordComponent extends BaseComponent {

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
      this.success(this.t('messages.success'));
      this.onComplete.emit();
    });
  }
}
