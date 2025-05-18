import {useAtomValue, useSetAtom} from 'jotai';
import {z} from 'zod';

import {atomWithLocalStorage} from '../util/atom';

const currentGroupIdSchema = z.number().nullable();

export const currentGroupIdAtom = atomWithLocalStorage(
  'current-group-id',
  null,
  currentGroupIdSchema,
);

export const useCurrentGroupId = () => useAtomValue(currentGroupIdAtom);

export const useSetCurrentGroupId = () => useSetAtom(currentGroupIdAtom);

currentGroupIdAtom.debugLabel = 'currentGroupIdAtom';
