import {queryOptions} from '@tanstack/react-query';
import {getUserAcceptedGroups} from './get-user';

export const userQueries = {
  all: () => ['user'],

  acceptedGroupsKey: () => [...userQueries.all(), 'acceptedGroups'],
  acceptedGroups: () =>
    queryOptions({
      queryKey: [...userQueries.acceptedGroupsKey()],
      queryFn: () => getUserAcceptedGroups(),
    }),
};
