export interface AuthLoginWithStaticPasswordRequest {
  username: string;
  password: string;
}

export enum OtpType {
  Cellphone = 1,
  Email = 2
}

export interface AuthLoginWithOtpRequest {
  type: OtpType;
  receiver: string;
  code: string;
}

export interface AuthRegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  otpCode: string;
}

export interface AuthLoginResponse {
  accessToken: string;
  isNeedTwoFactorAuthentication: boolean;
}

export interface LoginWithCodeRequest {
  receiver: string;
  code: string;
}
