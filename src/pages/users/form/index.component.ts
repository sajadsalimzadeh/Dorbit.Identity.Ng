import {Component, Injector} from '@angular/core';
import {BaseFormComponent} from "../../../../../panel/src/components";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRepository} from "../../../repositories/user.repository";
import {IdentitySharedModule} from "../../../components";

@Component({
  standalone: true,
  imports: [IdentitySharedModule],
  selector: 'app-user-form',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class UserFormComponent extends BaseFormComponent {

  form = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cellphone: new FormControl('', [Validators.minLength(11), Validators.maxLength(11)]),
    email: new FormControl('', [Validators.email]),
    needResetPassword: new FormControl(false),
    activeTokenCount: new FormControl(1, [Validators.required, Validators.max(65000)]),
  });

  constructor(injector: Injector, repository: UserRepository) {
    super(injector, repository);
  }

  override ngOnInit() {
    super.ngOnInit();

    if (this.form.controls.id.value) {
      this.form.controls.password.disable();
    } else {
      this.form.controls.password.enable();
    }
  }
}
