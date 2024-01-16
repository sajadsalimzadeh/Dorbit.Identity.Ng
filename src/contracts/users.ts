import {TokenResponse} from "./tokens";

export interface UserDto {

  id: string;
  name: string;
  email: string;
  cellphone: string;
  username: string;
  isTwoFactorAuthenticationEnable: boolean;
  needResetPassword: boolean;
  isActive: boolean;
  accesses: string[];
}

export enum UserLoginStrategy {
  None = 0,
  StaticPassword = 1,
  Cellphone = 2,
  Email = 3,
  Authenticator = 4
}

export interface LoginRequest {
  username: string;
  value: string;
  loginStrategy: UserLoginStrategy;
}

export interface UserLoginResponse {
  otpId: string;
  loginStrategy: UserLoginStrategy;

  token: TokenResponse;
}
