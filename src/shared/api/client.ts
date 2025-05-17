import ky from 'ky';
import {tokenAtom} from '../model/auth';
import {getDefaultStore} from 'jotai';
import {toast} from 'sonner';

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
    beforeError: [
      async error => {
        if (error.response.status === 401) {
          const defaultStore = getDefaultStore();
          defaultStore.set(tokenAtom, null);
          toast.error('로그인이 만료되었습니다. 다시 로그인해주세요.');
          window.location.href = '/login';
        }
        return error;
      },
    ],
  },
});
