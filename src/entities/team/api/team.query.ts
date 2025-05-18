import {queryOptions} from '@tanstack/react-query';

import {
  getTeamBuildingStatus,
  getTeamBySenderIdGroupId,
  getTeamContacts,
  getTeamMyTeam,
  getTeamRequestFromUserId,
  getTeamRequestReceived,
} from './get-team';

export const teamQueries = {
  all: () => ['team'],

  contactsKey: () => [...teamQueries.all(), 'contacts'],
  contacts: (teamId: number) =>
    queryOptions({
      queryKey: [...teamQueries.contactsKey(), teamId],
      queryFn: () => getTeamContacts(teamId),
    }),

  teamBySenderIdGroupIdKey: () => [...teamQueries.all(), 'team'],
  teamBySenderIdGroupId: (senderId: number, groupId: number) =>
    queryOptions({
      queryKey: [...teamQueries.teamBySenderIdGroupIdKey(), senderId, groupId],
      queryFn: () => getTeamBySenderIdGroupId(senderId, groupId),
    }),

  teamBuildingStatusKey: () => [...teamQueries.all(), 'team-building-status'],
  teamBuildingStatus: (groupId: number) =>
    queryOptions({
      queryKey: [...teamQueries.teamBuildingStatusKey(), groupId],
      queryFn: () => getTeamBuildingStatus(groupId),
    }),

  requestReceivedKey: () => [
    ...teamQueries.all(),
    'team',
    'request',
    'received',
  ],
  requestReceived: () =>
    queryOptions({
      queryKey: [...teamQueries.requestReceivedKey()],
      queryFn: () => getTeamRequestReceived(),
    }),

  requestFromUserIdKey: () => [
    ...teamQueries.all(),
    'team',
    'request',
    'from',
    'userId',
  ],
  requestFromUserId: (userId: number) =>
    queryOptions({
      queryKey: [...teamQueries.requestFromUserIdKey(), userId],
      queryFn: () => getTeamRequestFromUserId(userId),
    }),

  myTeamKey: () => [...teamQueries.all(), 'team', 'my-team'],
  myTeam: (groupId: number) =>
    queryOptions({
      queryKey: [...teamQueries.myTeamKey(), groupId],
      queryFn: () => getTeamMyTeam(groupId),
    }),
};
