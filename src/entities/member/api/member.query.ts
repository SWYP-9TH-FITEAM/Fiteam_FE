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
  myProfile: (groupId: number) =>
    queryOptions({
      queryKey: [...memberQueries.myProfileKey(), groupId],
      queryFn: () => getMemberMyProfile(groupId),
    }),

  myProfileMiniKey: () => [...memberQueries.all(), 'my-profile-mini'],
  myProfileMini: (groupId: number) =>
    queryOptions({
      queryKey: [...memberQueries.myProfileMiniKey(), groupId],
      queryFn: () => getMemberMyProfileMini(groupId),
    }),
};
