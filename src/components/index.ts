import {NgModule} from '@angular/core';
import {DorbitModule} from "@framework";
import {PanelSharedModule} from "@panel";

export const MODULES = [
  DorbitModule,
  PanelSharedModule,
]

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class IdentitySharedModule {
}
