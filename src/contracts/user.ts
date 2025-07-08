export interface UserDto {
    id: string;
    name: string;
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