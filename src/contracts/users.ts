export interface IdentityUserDto {
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

export interface UserEditRequest {
    name?: string;
    cellphone?: string;
    email?: string;
}
