import {NgModule} from '@angular/core';
import {DorbitModule} from "@framework";
import {AuthDirective} from "./auth.directive";

export * from './auth.directive';

export const COMPONENTS = [
  AuthDirective
]

export const MODULES = [
  DorbitModule,
]

@NgModule({
  imports: [MODULES],
  declarations: [COMPONENTS],
  exports: [MODULES, COMPONENTS],
})
export class IdentitySharedModule {
}
