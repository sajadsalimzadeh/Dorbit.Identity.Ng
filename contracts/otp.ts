import { OtpType } from "./auth";

export interface Otp {
    id: string;
    receiver: string;
    isUsed: boolean;
    type: OtpType;
    tryRemain: number;
    code: string;
    expireTime: Date;
    creationTime: Date;
}

export interface OtpSendRequest {
    type: OtpType;
    receiver: string;
}

export interface OtpValidateRequest {
    type: OtpType;
    code: string;
    receiver: string;
}
