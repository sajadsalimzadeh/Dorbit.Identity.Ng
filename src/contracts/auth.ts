import {TokenResponse} from "./tokens";

export interface AuthLoginRequest {
  username: string;
  value: string;
  loginStrategy: AuthMethod;
}

export interface AuthRegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  loginStrategy: AuthMethod;
}

export enum AuthMethod {
  None = 0,
  StaticPassword = 1,
  Cellphone = 2,
  Email = 3,
  Authenticator = 4
}

export interface AuthLoginResponse {
  otpId?: string;
  loginStrategy: AuthMethod;
  token: AuthTokenResponse;
}

export interface AuthTokenResponse {
  key: string;
  csrf: string;
}


export interface LoginRequest {
  username: string;
  value: string;
  loginStrategy: AuthMethod;
}

export interface LoginWithCodeRequest {
  otpId: string;
  loginStrategy: AuthMethod;
  code: string;
}

export interface UserLoginResponse {
  otpId: string;
  loginStrategy: AuthMethod;

  token: TokenResponse;
}
