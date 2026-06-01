import { OtpValidateRequest } from "./otp";
import { UserBase } from "./user";

export interface AuthLoginWithPasswordRequest {
    username: string;
    password: string;
}

export interface AuthLoginWithGoogleRequest {
    authorizationCode: string;
    redirectUrl: string;
}

export interface AuthLoginWithAppleRequest {
    authorizationCode: string;
    redirectUrl: string;
}

export enum OtpType {
    Cellphone = 1,
    Email = 2
}

export const OtpTypeLabels = {
    [OtpType.Cellphone]: 'شماره تلفن',
    [OtpType.Email]: 'ایمیل',
} as const;

export const OtpTypes = {
    [OtpType.Cellphone]: 'Cellphone',
    [OtpType.Email]: 'Email',
}

export interface AuthLoginWithOtpRequest {
    otpValidation: OtpValidateRequest;
}

export interface AuthRegisterRequest {
    name: string;
    username: string;
    email: string;
    password?: string;
    otpValidation: OtpValidateRequest;
}

export interface AuthForgetPasswordRequest {
    password: string;
    otpValidation: OtpValidateRequest;
}

export interface AuthLoginResponse {
    accessToken: string;
    isNeedTwoFactorAuthentication: boolean;
}

export interface LoginWithCodeRequest {

    otpValidation: OtpValidateRequest;
}

export interface IdentityDto<T extends UserBase = UserBase> {
    user: T;
    isFullAccess:boolean;
    accessibility: string[];
    isCellphoneVerified: boolean;
    isEmailVerificationRequired: boolean;
}