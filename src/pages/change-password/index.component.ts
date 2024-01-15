import {Component, Injector} from '@angular/core';
import {BasePanelComponent} from "@panel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRepository} from "../../repositories";

@Component({
  selector: 'page-identity-change-password',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends BasePanelComponent {

  form = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    renewPassword: new FormControl('', [Validators.required]),
  });


  constructor(injector: Injector, private userRepository: UserRepository) {
    super(injector);
  }

  submit() {
    if(this.form.invalid) return this.messages.formInvalid();
    this.userRepository.changePassword(this.form.value).subscribe(res => {
      this.router.navigate(['/'])
    })
  }
}
