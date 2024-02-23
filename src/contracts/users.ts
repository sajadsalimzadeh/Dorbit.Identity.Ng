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

export enum LoginStrategy {
  None = 0,
  StaticPassword = 1,
  Cellphone = 2,
  Email = 3,
  Authenticator = 4
}

export interface LoginRequest {
  username: string;
  value: string;
  loginStrategy: LoginStrategy;
}

export interface LoginWithCodeRequest {
  otpId: string;
  loginStrategy: LoginStrategy;
  code: string;
}

export interface UserLoginResponse {
  otpId: string;
  loginStrategy: LoginStrategy;

  token: TokenResponse;
}
