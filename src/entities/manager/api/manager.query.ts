import {queryOptions} from '@tanstack/react-query';

import {
  getManagerGroupIdMembers,
  getManagerGroupProcess,
  getManagerGroupsAll,
  getManagerGroupsIdName,
  getManagerName,
} from './get-manager';

export const managerQueries = {
  all: () => ['manager'],

  nameKey: () => [...managerQueries.all(), 'name'],
  name: () =>
    queryOptions({
      queryKey: [...managerQueries.nameKey()],
      queryFn: () => getManagerName(),
    }),

  membersKey: () => [...managerQueries.all(), 'groupIdMembers'],
  members: (groupId: number) =>
    queryOptions({
      queryKey: [...managerQueries.membersKey(), groupId],
      queryFn: () => getManagerGroupIdMembers(groupId),
    }),

  groupProcessKey: () => [...managerQueries.all(), 'groupProcess'],
  groupProcess: () =>
    queryOptions({
      queryKey: [...managerQueries.groupProcessKey()],
      queryFn: () => getManagerGroupProcess(),
    }),

  groupsIdNameKey: () => [...managerQueries.all(), 'groupsIdName'],
  groupsIdName: () =>
    queryOptions({
      queryKey: [...managerQueries.groupsIdNameKey()],
      queryFn: () => getManagerGroupsIdName(),
    }),

  groupsAllKey: () => [...managerQueries.all(), 'groupsAll'],
  groupsAll: () =>
    queryOptions({
      queryKey: [...managerQueries.groupsAllKey()],
      queryFn: () => getManagerGroupsAll(),
    }),
};
