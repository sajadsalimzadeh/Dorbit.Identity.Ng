import {Component, HostBinding, Injector} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BaseComponent} from "@framework";
import {AuthRepository} from "../../repositories";
import {AuthLoginWithStaticPasswordRequest} from "@identity";

@Component({
    selector: 'page-auth',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    standalone: false
})
export class IndexComponent extends BaseComponent {

  @HostBinding('style.background-image') backgroundImage = 'url("assets/images/auth.jpg")';

  theme: string = 'light';

  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    captcha: new FormControl(''),
  });

  constructor(
    injector: Injector,
    private authRepository: AuthRepository) {
    super(injector);
  }

  submit() {
    this.authRepository.loginWithStaticPassword(this.form.value as AuthLoginWithStaticPasswordRequest).subscribe(res => {
      if(res.data) {
        localStorage.setItem('token', res.data.accessToken);
        this.router.navigate(['/']);
      }
    })
  }
}
