import {ModuleWithProviders, NgModule} from "@angular/core";
import {BaseLayoutService, DorbitModule} from "@framework";
import {LayoutService} from "./services";
import {IdentitySharedModule} from "./components";

interface Configs {
}

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
  static configs: Configs;

  static forRoot(configs?: Configs): ModuleWithProviders<IdentityModule> {
    this.configs = configs ?? {};

    return {
      ngModule: IdentityModule,
      providers: [
        {provide: BaseLayoutService, useClass: LayoutService, multi: true},
      ]
    }
  }
}
