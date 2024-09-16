import {Component, Input} from '@angular/core';
import {ButtonModule, CryptoUtil} from "@framework";

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
