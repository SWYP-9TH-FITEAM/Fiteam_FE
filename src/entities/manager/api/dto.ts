import {z} from 'zod';

export const postManagerNewNoticeRequestDto = z.object({
  groupId: z.number().int(),
  title: z.string(),
  context: z.string(),
});

export type PostManagerNewNoticeRequestDto = z.infer<
  typeof postManagerNewNoticeRequestDto
>;

export const postManagerNewNoticeResponseDto = z.object({
  id: z.number().int(),
  managerId: z.number().int(),
  groupId: z.number().int(),
  title: z.string(),
  context: z.string(),
  createdAt: z.string().datetime(),
});

export type PostManagerNewNoticeResponseDto = z.infer<
  typeof postManagerNewNoticeResponseDto
>;

export const patchManagerNoticeRequestDto = z.object({
  groupId: z.number().int(),
  title: z.string(),
  context: z.string(),
});

export type PatchManagerNoticeRequestDto = z.infer<
  typeof patchManagerNoticeRequestDto
>;

export const patchManagerNoticeResponseDto = z.object({
  id: z.number().int(),
  managerId: z.number().int(),
  groupId: z.number().int(),
  title: z.string(),
  context: z.string(),
  createdAt: z.string().datetime(),
});

export type PatchManagerNoticeResponseDto = z.infer<
  typeof patchManagerNoticeResponseDto
>;

export const getManagerGroupIdMembersResponseDto = z.object({
  userId: z.number().int(),
  memberId: z.number().int(),
  userName: z.string(),
  profileImageUrl: z.string().url().nullable(),
  cardId1: z.number().int().nullable(),
  position: z.string().nullable(),
  teamStatus: z.string().nullable(),
  teamId: z.number().int().nullable(),
  likeId: z.number().int().nullable(),
});

export type GetManagerGroupIdMembersResponseDto = z.infer<
  typeof getManagerGroupIdMembersResponseDto
>;

export const getManagerNameResponseDto = z.object({
  managerId: z.number().int(),
  managerName: z.string(),
});

export type GetManagerNameResponseDto = z.infer<
  typeof getManagerNameResponseDto
>;

export const getManagerGroupProcessResponseDto = z.array(
  z.object({
    id: z.number().int(),
    name: z.string(),
    description: z.string(),
    createdAt: z.string().datetime(),
    endDatetime: z.string().datetime(),
  }),
);

export type GetManagerGroupsProcessResponseDto = z.infer<
  typeof getManagerGroupProcessResponseDto
>;

export const getManagerGroupsIdNameResponseDto = z.array(
  z.object({
    id: z.number().int(),
    name: z.string(),
    status: z.string(),
  }),
);

export type GetManagerGroupsIdNameResponseDto = z.infer<
  typeof getManagerGroupsIdNameResponseDto
>;

export const GROUP_STATUS = Object.freeze({
  ONGOING: 'ONGOING',
  PENDING: 'PENDING',
  ENDED: 'ENDED',
} as const);

export const getManagerGroupsAllResponseDto = z.array(
  z.object({
    groupId: z.number().int(),
    groupName: z.string(),
    memberCount: z.number().int(),
    positionBased: z.boolean(),
    status: z.enum([
      GROUP_STATUS.ENDED,
      GROUP_STATUS.ONGOING,
      GROUP_STATUS.PENDING,
    ]),
  }),
);

export type GetManagerGroupsAllResponseDto = z.infer<
  typeof getManagerGroupsAllResponseDto
>;
