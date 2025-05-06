import ky from 'ky';
import {tokenAtom} from '../model/auth';
import {getDefaultStore} from 'jotai';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_BE_API,
});

export const apiWithAuth = api.extend({
  hooks: {
    beforeRequest: [
      async request => {
        const defaultStore = getDefaultStore();
        const token = defaultStore.get(tokenAtom);

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});
