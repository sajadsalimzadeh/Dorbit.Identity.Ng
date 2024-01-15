import {Component, HostBinding, Injector} from '@angular/core';
import {BaseComponent, DorbitModule} from "@framework";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthRepository} from "../../repositories";
import {LoginRequest} from "@identity";

@Component({
  standalone: true,
  imports: [DorbitModule],
  selector: 'page-auth',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends BaseComponent {

  @HostBinding('style.background-image') backgroundImage = 'url("assets/images/auth.jpg")';

  form = new FormGroup({
    username: new FormControl(''),
    value: new FormControl(''),
    captcha: new FormControl(''),
  });

  constructor(injector: Injector, private authRepository: AuthRepository) {
    super(injector);
  }

  submit() {
    const fv = this.form.value as LoginRequest;
    this.authRepository.login(fv).subscribe(res => {
      this.router.navigate(['/'])
    })
  }
}
