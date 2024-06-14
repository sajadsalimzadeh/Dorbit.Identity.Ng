import {ModuleWithProviders, NgModule} from '@angular/core';
import {BaseLayoutService} from "@panel";
import {LayoutService} from "./services";
import {Routes} from "@angular/router";
import {DorbitModule} from "@framework";

export * from './contracts';
export * from './guards';
export * from './interceptors';
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
  static configs: Configs;

  static getRoutes(data?: any): Routes {
    return [
      {path: `users`, loadChildren: () => import('./pages/users/index.module').then(x => x.UsersModule), data: data},
      {path: `accesses`, loadChildren: () => import('./pages/accesses/index.module').then(x => x.IndexModule), data: data},
      {path: `change-password`, loadChildren: () => import('./pages/change-password/index.module').then(x => x.IndexModule), data: data},
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
