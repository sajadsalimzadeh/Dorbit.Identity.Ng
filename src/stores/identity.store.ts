import {Store} from '@framework';

export interface IdentityStore {
  token: string;
}

export const identityStore = new Store<IdentityStore>('')
