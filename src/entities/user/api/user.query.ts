import {queryOptions} from '@tanstack/react-query';

import {
  getUserCard,
  getUserCardIds,
  getUserGroupsAccepted,
  getUserGroupsPending,
  getUserMiniResult,
  getUserNameImgJob,
  getUserSettings,
} from './get-user';

export const userQueries = {
  all: () => ['user'],

  cardKey: () => [...userQueries.all(), 'card'],
  card: () =>
    queryOptions({
      queryKey: [...userQueries.cardKey()],
      queryFn: () => getUserCard(),
    }),

  nameImgJobKey: () => [...userQueries.all(), 'name-img-job'],
  nameImgJob: () =>
    queryOptions({
      queryKey: [...userQueries.nameImgJobKey()],
      queryFn: () => getUserNameImgJob(),
    }),

  settingsKey: () => [...userQueries.all(), 'settings'],
  settings: () =>
    queryOptions({
      queryKey: [...userQueries.settingsKey()],
      queryFn: () => getUserSettings(),
    }),

  cardIdsKey: () => [...userQueries.all(), 'card-ids'],
  cardIds: () =>
    queryOptions({
      queryKey: [...userQueries.cardIdsKey()],
      queryFn: () => getUserCardIds(),
    }),

  miniResultKey: () => [...userQueries.all(), 'mini-result'],
  miniResult: () =>
    queryOptions({
      queryKey: [...userQueries.miniResultKey()],
      queryFn: () => getUserMiniResult(),
    }),

  groupsAcceptedKey: () => [...userQueries.all(), 'groups-accepted'],
  groupsAccepted: () =>
    queryOptions({
      queryKey: [...userQueries.groupsAcceptedKey()],
      queryFn: () => getUserGroupsAccepted(),
    }),

  groupsPendingKey: () => [...userQueries.all(), 'groups-pending'],
  groupsPending: () =>
    queryOptions({
      queryKey: [...userQueries.groupsPendingKey()],
      queryFn: () => getUserGroupsPending(),
    }),
};
