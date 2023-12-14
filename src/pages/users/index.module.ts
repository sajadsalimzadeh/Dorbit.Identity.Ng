import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";

import {IndexComponent} from './index.component';
import {FormComponent} from "./form/index.component";
import {PanelSharedModule} from "@panel";
import {AccessComponent} from "./access/index.component";
import {IdentitySharedModule} from "../../components";

@NgModule({
  imports: [
    IdentitySharedModule,
    RouterModule.forChild([{path: '', component: IndexComponent}]),
    PanelSharedModule
  ],
  exports: [],
  declarations: [IndexComponent, FormComponent, AccessComponent],
  providers: [],
})
export class IndexModule {
}
