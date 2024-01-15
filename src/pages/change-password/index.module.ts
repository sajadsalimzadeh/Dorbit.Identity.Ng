import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";

import {IndexComponent} from './index.component';
import {IdentitySharedModule} from "../../components";

@NgModule({
  imports: [
    IdentitySharedModule,
    RouterModule.forChild([{path: '', component: IndexComponent}]),
  ],
  declarations: [IndexComponent],
})
export class IndexModule {
}
