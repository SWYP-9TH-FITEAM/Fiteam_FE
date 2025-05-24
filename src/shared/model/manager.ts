import {z} from 'zod';
import {atomWithLocalStorage} from '../util/atom';
import {useAtomValue, useSetAtom} from 'jotai';

const managerInfoSchema = z
  .object({
    managerId: z.number(),
    managerName: z.string(),
  })
  .nullable();

const managerInfoAtom = atomWithLocalStorage(
  'manager-info',
  null,
  managerInfoSchema,
);

export const useManagerInfo = () => useAtomValue(managerInfoAtom);

export const useSetManagerInfo = () => useSetAtom(managerInfoAtom);

managerInfoAtom.debugLabel = 'managerInfoAtom';
