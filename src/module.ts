import {NgModule} from "@angular/core";
import {DorbitModule} from "@framework";
import {IdentitySharedModule} from "./components/_public";

@NgModule({
  imports: [
    DorbitModule
  ],
  exports: [
    DorbitModule,
    IdentitySharedModule
  ],
})
export class IdentityModule {
}
