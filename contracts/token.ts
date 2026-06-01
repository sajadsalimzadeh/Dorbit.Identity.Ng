export interface TokenResponse {
    csrf: string;
    key: string;
}

export interface Token {
    id: string;
    creationTime: string;
    expireTime: string;
    tokenInfo: TokenInfo;
    state: TokenState;
}

export enum TokenState {
    Terminated = -2,
    Blocked = -1,
    Valid = 1,
}

export const TokenStates = {
    [TokenState.Terminated]: 'users.tokens.states.terminated',
    [TokenState.Blocked]: 'users.tokens.states.blocked',
    [TokenState.Valid]: 'users.tokens.states.valid',
}

export interface TokenInfo {
    device: string;
    os: string;
    browser: string;
}