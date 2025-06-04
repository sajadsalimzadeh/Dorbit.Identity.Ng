import {Store} from '@framework/stores/store';

export interface IdentityStore {
    token: string;
}

export const identityStore = new Store<IdentityStore>('')
