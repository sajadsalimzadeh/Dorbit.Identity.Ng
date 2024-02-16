import {Component, Input, OnInit} from '@angular/core';
import {base64encode, ButtonModule, CryptoUtil} from "@framework";
import {UserRepository} from "@identity";

@Component({
  standalone: true,
  selector: 'app-identity-message',
  imports: [
    ButtonModule
  ],
  templateUrl: 'index.component.html'
})
export class IdentityMessageComponent {
  @Input() user: any;
  @Input() dialog: any;

  protected seenMessage() {
    localStorage.setItem('user-message', CryptoUtil.hashCode(this.user.message).toString());
    this.dialog?.close();
  }
}
