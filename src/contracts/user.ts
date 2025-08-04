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

export const UserStatusOptions = [
    { label: 'فعال', value: UserStatus.Active },
    { label: 'غیر فعال', value: UserStatus.InActive },
]