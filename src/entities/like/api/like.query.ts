import {queryOptions} from '@tanstack/react-query';

import {getLikeList, getLikeMemoByLikeId} from './get-like';

export const likeQueries = {
  all: () => ['like'],

  memoByLikeIdKey: () => [...likeQueries.all(), 'memo'],
  memoByLikeId: (likeId: number) =>
    queryOptions({
      queryKey: [...likeQueries.memoByLikeIdKey(), likeId],
      queryFn: () => getLikeMemoByLikeId(likeId),
    }),

  listKey: () => [...likeQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...likeQueries.listKey()],
      queryFn: () => getLikeList(),
    }),
};
