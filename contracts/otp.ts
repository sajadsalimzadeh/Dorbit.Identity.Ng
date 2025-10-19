import { OtpType } from "./auth";

export interface OtpSendRequest {
    type: OtpType;
    receiver: string;
}

export interface OtpValidateRequest {
    type: OtpType;
    code: string;
    receiver: string;
}
