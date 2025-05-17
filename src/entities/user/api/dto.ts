import {z} from 'zod';

export const getUserCardResponseDto = z.object({
  code: z.string(),
  imgUrl: z.string(),
  name: z.string(),
  keyword: z.string(),
  summary: z.string(),
  teamStrength: z.string(),
  caution: z.string(),
  bestMatchCode1: z.string(),
  bestMatchReason1: z.string(),
  bestMatchCode2: z.string(),
  bestMatchReason2: z.string(),
  worstMatchCode1: z.string(),
  worstMatchReason1: z.string(),
  worstMatchCode2: z.string(),
  worstMatchReason2: z.string(),
  details: z.string(),
  ei: z.number(),
  pd: z.number(),
  cl: z.number(),
  va: z.number(),
});

export type GetUserCardResponseDto = z.infer<typeof getUserCardResponseDto>;

export const getUserGroupsAcceptedResponseDto = z.array(
  z.object({
    groupId: z.number().int(),
    groupName: z.string(),
    invitedAt: z.string().datetime().nullable(),
  }),
);

export type GetUserGroupsAcceptedResponseDto = z.infer<
  typeof getUserGroupsAcceptedResponseDto
>;

export const getUserGroupsPendingResponseDto = z.array(
  z.object({
    groupId: z.number().int(),
    groupName: z.string(),
    invitedAt: z.string().datetime(),
  }),
);

export type GetUserGroupsPendingResponseDto = z.infer<
  typeof getUserGroupsPendingResponseDto
>;

export const getUserNameImgJobResponseDto = z.object({
  userName: z.string(),
  profileImgUrl: z.string().url().nullable(),
  job: z.string().nullable(),
});

export type GetUserNameImgJobResponseDto = z.infer<
  typeof getUserNameImgJobResponseDto
>;

export const getUserSettingsResponseDto = z.object({
  userName: z.string(),
  profileImgUrl: z.string().url(),
  phoneNumber: z.string(),
  kakaoId: z.string(),
  job: z.string(),
  major: z.string(),
  introduction: z.string(),
  url: z.string().url(),
  cardId1: z.number(),
  cardId2: z.number(),
  details: z.string(),
  numEI: z.number(),
  numPD: z.number(),
  numVA: z.number(),
  numCL: z.number(),
  createdAt: z.string().datetime(),
});

export type GetUserSettingsResponseDto = z.infer<
  typeof getUserSettingsResponseDto
>;

export const getUserMiniResultResponseDto = z.object({
  code: z.string(),
  name: z.string(),
  numEI: z.number(),
  numPD: z.number(),
  numVA: z.number(),
  numCL: z.number(),
});

export type GetUserMiniResultResponseDto = z.infer<
  typeof getUserMiniResultResponseDto
>;
