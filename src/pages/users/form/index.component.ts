import {Component, Injector} from '@angular/core';
import {BaseFormComponent} from "@panel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRepository} from "../../../repositories/user.repository";

@Component({
  selector: 'app-form',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class FormComponent extends BaseFormComponent {

  form = new FormGroup({
    id: new FormControl('', []),
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cellphone: new FormControl('', [Validators.minLength(11), Validators.maxLength(11)]),
    email: new FormControl('', [Validators.email]),
    needResetPassword: new FormControl(false),
  });

  constructor(injector: Injector, repository: UserRepository) {
    super(injector, repository);
  }

  override ngOnInit() {
    super.ngOnInit();

    if (this.form.controls.id.value) {
      this.form.controls.username.disable();
      this.form.controls.password.disable();
    } else {
      this.form.controls.username.enable();
      this.form.controls.password.enable();
    }
  }
}
