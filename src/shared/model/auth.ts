import {useAtomValue, useSetAtom} from 'jotai';
import {z} from 'zod';

import {atomWithLocalStorage} from '../util/atom';

const tokenSchema = z.string().nullable();

export const tokenAtom = atomWithLocalStorage('token', null, tokenSchema);

export const useToken = () => useAtomValue(tokenAtom);

export const useSetToken = () => useSetAtom(tokenAtom);

tokenAtom.debugLabel = 'tokenAtom';
