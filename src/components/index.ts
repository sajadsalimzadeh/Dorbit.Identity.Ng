import {NgModule} from '@angular/core';
import {DorbitModule} from "@framework";

export const MODULES = [
  DorbitModule
]

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ],
  declarations: [],
  providers: [],
})
export class IdentitySharedModule {
}
