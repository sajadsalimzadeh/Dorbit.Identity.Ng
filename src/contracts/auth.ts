import { OtpValidateRequest } from "./otp";
import { UserDto } from "./user";

export interface AuthLoginWithPasswordRequest {
    username: string;
    password: string;
}

export interface AuthLoginWithGoogleRequest {
    token: string;
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
    otpValidation: OtpValidateRequest;
}

export interface AuthLoginResponse {
    accessToken: string;
    isNeedTwoFactorAuthentication: boolean;
}

export interface LoginWithCodeRequest {
    receiver: string;
    code: string;
}

export interface IdentityDto<T extends UserDto = any> {
    user: T;
    isFullAccess:boolean;
    accessibility: string[];
    isCellphoneVerificationRequired: boolean;
    isEmailVerificationRequired: boolean;
}