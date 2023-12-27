import {ModuleWithProviders, NgModule} from '@angular/core';
import {BaseLayoutService} from "../../panel/src/services/base-layout.service";
import {LayoutService} from "./services";
import {Routes} from "@angular/router";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {DorbitModule} from "@framework";
import {AuthInterceptor} from "./interceptors/auth.interceptor";

export * from './models';
export * from './guards';
export * from './repositories';
export * from './services';

interface Configs {
  loginPath: string;
}

@NgModule({
  imports: [
    DorbitModule,
  ],
  exports: [
    DorbitModule,
  ],
  declarations: [],
  providers: [],
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

  static forRoot(configs: Configs): ModuleWithProviders<IdentityModule> {
    this.configs = configs;

    return {
      ngModule: IdentityModule,
      providers: [
        {provide: BaseLayoutService, useClass: LayoutService, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
      ]
    }
  }
}
