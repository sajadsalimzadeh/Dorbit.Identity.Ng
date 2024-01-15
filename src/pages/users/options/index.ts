import {InjectionToken, Type} from "@angular/core";
import {Colors, DialogOptions} from "@framework";

export interface UserOption {
  icon: string;
  color: Colors;
  component: Type<any>;
  dialog?: DialogOptions;
}

export const USER_OPTION = new InjectionToken<UserOption>('USER_OPTION');
