import {NgModule} from '@angular/core';
import {DorbitModule} from "@dorbit";

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
