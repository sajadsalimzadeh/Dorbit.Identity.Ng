import {Component, Injector} from '@angular/core';
import {BasePanelComponent} from "@panel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRepository} from "../../repositories";
import {LoginStrategy} from "@identity";

@Component({
  selector: 'page-identity-change-password',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends BasePanelComponent {

  form = new FormGroup({
    value: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    renewPassword: new FormControl('', [Validators.required]),
    strategy: new FormControl(LoginStrategy.StaticPassword, [Validators.required]),
  });


  constructor(injector: Injector, private userRepository: UserRepository) {
    super(injector);
  }

  submit() {
    if (this.form.invalid) return this.messages.formInvalid();
    this.userRepository.ownChangePassword(this.form.value).subscribe(res => {
      this.form.reset();
      this.messages.success();
    })
  }
}
