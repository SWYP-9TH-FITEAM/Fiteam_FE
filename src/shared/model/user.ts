import {z} from 'zod';
import {atomWithLocalStorage} from '../util/atom';
import {useAtomValue, useSetAtom} from 'jotai';

const userInfoSchema = z
  .object({
    email: z.string(),
    type: z.enum(['user', 'manager']),
  })
  .nullable();

const userInfoAtom = atomWithLocalStorage('user-info', null, userInfoSchema);

export const useUserInfo = () => useAtomValue(userInfoAtom);

export const useSetUserInfo = () => useSetAtom(userInfoAtom);

userInfoAtom.debugLabel = 'userInfoAtom';
