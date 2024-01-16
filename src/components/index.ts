import {NgModule} from '@angular/core';
import {DorbitModule} from "@framework";
import {PanelSharedModule} from "@panel";

export const COMPONENTS = [
]

export const MODULES = [
  DorbitModule,
  PanelSharedModule,
]

@NgModule({
  imports: [MODULES],
  declarations: [COMPONENTS],
  exports: [MODULES, COMPONENTS],
})
export class IdentitySharedModule {
}
