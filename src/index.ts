import {ModuleWithProviders, NgModule} from '@angular/core';
import {BaseLayoutService} from "../../panel/src/services/base-layout.service";
import {LayoutService} from "./services";
import {Routes} from "@angular/router";
import {DorbitModule} from "@framework";

export * from './contracts';
export * from './guards';
export * from './repositories';
export * from './services';

export * from './pages/auth/index.module';
export * from './pages/users/options';

interface Configs {
}

@NgModule({
  imports: [DorbitModule],
  exports: [DorbitModule],
})
export class IdentityModule {
  static readonly route_prefix = 'identity';
  static configs: Configs;

  static getRoutes(): Routes {
    return [
      {path: `${this.route_prefix}/users`, loadChildren: () => import('./pages/users/index.module').then(x => x.IndexModule)},
      {path: `${this.route_prefix}/accesses`, loadChildren: () => import('./pages/accesses/index.module').then(x => x.IndexModule)},
      {path: `${this.route_prefix}/change-password`, loadChildren: () => import('./pages/change-password/index.module').then(x => x.IndexModule)},
    ]
  }

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
