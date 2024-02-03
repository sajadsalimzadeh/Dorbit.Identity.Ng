import {InjectionToken, Type} from "@angular/core";
import {Colors, DialogOptions, DialogRef} from "@framework";

export interface UserOption {
  icon: string;
  color: Colors;
  text?: string;
  component: Type<IUserOptionComponent>;
  dialog?: DialogOptions;
  accesses?: string[];
}

export interface IUserOptionComponent {
  user: any;
  dialog: DialogRef;
}

export const USER_OPTION = new InjectionToken<UserOption>('USER_OPTION');
