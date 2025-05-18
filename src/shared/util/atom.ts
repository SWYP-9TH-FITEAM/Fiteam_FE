import type {SetStateAction} from 'jotai';

import {atom} from 'jotai';
import {z} from 'zod';

export const atomWithLocalStorage = <Schema extends z.ZodTypeAny>(
  key: string,
  fallbackInitialValue: z.infer<Schema>,
  schema: Schema,
) => {
  const getInitialValue = (): z.infer<Schema> => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      const parsed = schema.safeParse(JSON.parse(item));
      if (parsed.success) return parsed.data;
    }
    return fallbackInitialValue;
  };

  const baseAtom = atom(getInitialValue());

  const derivedAtom = atom<
    z.infer<Schema>,
    [SetStateAction<z.infer<Schema>>],
    void
  >(
    get => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function'
          ? (update as (prev: z.infer<Schema>) => z.infer<Schema>)(
              get(baseAtom),
            )
          : update;

      set(baseAtom, nextValue);

      localStorage.setItem(key, JSON.stringify(nextValue));
    },
  );
  return derivedAtom;
};
