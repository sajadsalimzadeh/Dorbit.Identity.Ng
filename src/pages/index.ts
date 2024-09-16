import {Routes} from "@angular/router";

export * from "./users";
export * from "./auth/index.module";
export * from "./accesses/index.module";
export * from "./change-password/index.module";

export function identityRoutes(data?: any): Routes {
  return [
    {path: `users`, loadChildren: () => import('./users/index.module').then(x => x.PageUsersModule), data: data},
    {path: `accesses`, loadChildren: () => import('./accesses/index.module').then(x => x.PageAccessesModule), data: data},
    {path: `change-password`, loadChildren: () => import('./change-password/index.module').then(x => x.PageChangePasswordModule), data: data},
  ]
}
