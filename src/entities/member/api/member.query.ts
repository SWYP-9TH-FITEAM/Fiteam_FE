import {queryOptions} from '@tanstack/react-query';
import {
  getMemberMyProfile,
  getMemberMyProfileMini,
  getMemberPositionsByGroupId,
  getMemberProfileByMemberId,
  getMembersByGroupId,
} from './get-member';

export const memberQueries = {
  all: () => ['member'],

  positionsByGroupIdKey: () => [...memberQueries.all(), 'positions'],
  positionsByGroupId: (groupId: number) =>
    queryOptions({
      queryKey: [...memberQueries.positionsByGroupIdKey(), groupId],
      queryFn: () => getMemberPositionsByGroupId(groupId),
    }),

  membersByGroupIdKey: () => [...memberQueries.all(), 'members'],
  membersByGroupId: (groupId: number) =>
    queryOptions({
      queryKey: [...memberQueries.membersByGroupIdKey(), groupId],
      queryFn: () => getMembersByGroupId(groupId),
    }),

  profileByMemberIdKey: () => [...memberQueries.all(), 'profile'],
  profileByMemberId: (memberId: number) =>
    queryOptions({
      queryKey: [...memberQueries.profileByMemberIdKey(), memberId],
      queryFn: () => getMemberProfileByMemberId(memberId),
    }),

  myProfileKey: () => [...memberQueries.all(), 'my-profile'],
  myProfile: () =>
    queryOptions({
      queryKey: [...memberQueries.myProfileKey()],
      queryFn: () => getMemberMyProfile(),
    }),

  myProfileMiniKey: () => [...memberQueries.all(), 'my-profile-mini'],
  myProfileMini: () =>
    queryOptions({
      queryKey: [...memberQueries.myProfileMiniKey()],
      queryFn: () => getMemberMyProfileMini(),
    }),
};
