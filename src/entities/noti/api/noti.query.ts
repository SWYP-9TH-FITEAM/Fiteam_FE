import {queryOptions} from '@tanstack/react-query';
import {getNotiAll, getNotiById} from './get-noti';

export const notiQueries = {
  all: () => ['noti'],

  oneKey: () => [...notiQueries.all(), 'one'],
  one: (id: number) =>
    queryOptions({
      queryKey: [...notiQueries.oneKey(), id],
      queryFn: () => getNotiById(id),
    }),

  listKey: () => [...notiQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...notiQueries.listKey()],
      queryFn: () => getNotiAll(),
    }),
};
