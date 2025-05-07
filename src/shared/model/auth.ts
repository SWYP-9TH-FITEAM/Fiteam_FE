import {z} from 'zod';
import {atomWithLocalStorage} from '../util/atom';
import {useAtomValue, useSetAtom} from 'jotai';

const tokenSchema = z.string().nullable();

export const tokenAtom = atomWithLocalStorage('token', null, tokenSchema);

export const useToken = () => useAtomValue(tokenAtom);

export const useSetToken = () => useSetAtom(tokenAtom);
