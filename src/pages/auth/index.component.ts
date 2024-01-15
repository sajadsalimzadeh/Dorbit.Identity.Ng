import {Component, HostBinding, Injector} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BaseComponent} from "@framework";
import {AuthRepository} from "../../repositories";
import {LoginRequest} from "../../contracts";
import {AuthService} from "../../services";
import {panelStore} from "../../../../panel/src/stores";

@Component({
  selector: 'page-auth',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends BaseComponent {

  @HostBinding('style.background-image') backgroundImage = 'url("assets/images/auth.jpg")';

  theme = panelStore.store.theme;

  form = new FormGroup({
    username: new FormControl(''),
    value: new FormControl(''),
    captcha: new FormControl(''),
  });

  constructor(
    injector: Injector,
    private authService: AuthService,
    private authRepository: AuthRepository) {
    super(injector);
  }

  submit() {
    const fv = this.form.value as LoginRequest;
    this.authRepository.login(fv).subscribe(res => {
      this.authService.$login.next(res.data);
      this.router.navigate(['/'])
    })
  }
}
