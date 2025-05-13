import {queryOptions} from '@tanstack/react-query';
import {
  getUserCard,
  getUserGroupsAccepted,
  getUserGroupsPending,
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
