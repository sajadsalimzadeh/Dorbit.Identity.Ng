import { OtpType } from "./auth";

export interface UserBase {
    id: string;
    name: string;
    username: string;
    code: number;
    hasPassword: boolean;
    cellphone: string;
    cellphoneVerificationTime: Date;
    email: string;
    emailVerificationTime: Date;
    
    authenticatorKey: string;
    authenticatorValidateTime: Date;
    thumbnailFilename: string;
    
    needResetPassword: boolean;
    status: UserStatus;
    message: string;
    
    maxTokenCount: number;
    creationTime: Date;
    accessibility: string[];
    firebaseTokens: string[];
}


export interface UserEditRequest {
    name?: string;
    cellphone?: string;
    email?: string;
    thumbnailFilename?: string;
}

export enum UserStatus
{
    InActive = 0,
    Active = 1,
}

export const UserStatusOptions = [
    { label: 'فعال', value: UserStatus.Active },
    { label: 'غیر فعال', value: UserStatus.InActive },
]

export interface UserVerifyRequest {
    type: OtpType;
    receiver: string;
    code: string;
}

export interface UserPrivilege {
    id: string;
    userId: string;
    tenantId?: string;
    from?: string;
    to?: string;
    isFullAccess?: boolean;
    roleIds?: string[];
    accessibility: string[];
}

