import {ModuleWithProviders, NgModule} from "@angular/core";
import {DorbitModule} from "@framework";
import {BaseLayoutService} from "@panel";
import {LayoutService} from "./services";

interface Configs {
}

@NgModule({
  imports: [DorbitModule],
  exports: [DorbitModule],
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
