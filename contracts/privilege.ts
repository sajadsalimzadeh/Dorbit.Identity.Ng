export interface Privilege {
    id: string;
    userId: string;
    from: string;
    to: string;
    roleIds: string[];
    accessibility: string[];
    isFullAccess: boolean;
}

export interface UserPrivilegeSaveRequest {
    id?: string;
    tenantId?: string;
    userId: string;
    from?: string;
    to?: string;
    roleIds?: string[];
    accessibility?: string[];
    isFullAccess?: boolean;
}