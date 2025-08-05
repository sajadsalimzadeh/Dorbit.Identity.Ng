export interface UserDto {
    id: string;
    name: string;
    username: string;
    code: number;
    hasPassword: boolean;
    cellphone: string;
    cellphoneValidateTime: Date;
    email: string;
    emailValidateTime: Date;
    
    authenticatorKey: string;
    authenticatorValidateTime: Date;
    thumbnail: string;
    
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