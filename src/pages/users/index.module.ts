import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";

import {IndexComponent} from './index.component';
import {UserFormComponent} from "./form/index.component";
import {UserAccessComponent} from "./access/index.component";
import {IdentitySharedModule} from "../../components";
import {UserResetPasswordComponent} from "./reset-password/index.component";

@NgModule({
  imports: [
    IdentitySharedModule,
    UserFormComponent,
    UserAccessComponent,
    UserResetPasswordComponent,
    RouterModule.forChild([{path: '', component: IndexComponent}]),
  ],
  exports: [],
  declarations: [IndexComponent],
  providers: [],
})
export class UsersModule {
}
