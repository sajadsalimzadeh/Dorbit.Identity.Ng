export interface Privilege {
    id: string;
    userId: string;
    from: string;
    to: string;
    roleIds: string[];
    accessibility: string[];
    isAdmin: boolean;
}

export interface PrivilegeSaveRequest {
    id?: string;
    userId: string;
    from: string;
    to: string;
    roleIds: string[];
    accessibility: string[];
    isAdmin: boolean;
}