import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";

import {IndexComponent} from './index.component';
import {FormComponent} from "./form/index.component";
import {AccessComponent} from "./access/index.component";
import {IdentitySharedModule} from "../../components";
import {ResetPasswordComponent} from "./reset-password/index.component";

@NgModule({
  imports: [
    IdentitySharedModule,
    RouterModule.forChild([{path: '', component: IndexComponent}]),
  ],
  exports: [FormComponent],
  declarations: [IndexComponent, FormComponent, AccessComponent, ResetPasswordComponent],
  providers: [],
})
export class IndexModule {
}
