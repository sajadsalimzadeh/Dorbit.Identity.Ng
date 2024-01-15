import {InjectionToken, Type} from "@angular/core";
import {Colors} from "@framework";

export interface UserOption {
  icon: string;
  color: Colors;
  title: string;
  component: Type<any>;
}

export const USER_OPTION = new InjectionToken<UserOption>('USER_OPTION');
