import {z} from 'zod';

export const patchMemberProfileGroupMemberIdRequestDto = z.object({
  position: z.string().nullable(),
  workHistory: z.number().int().nullable(),
  projectGoal: z.string().nullable(),
  projectPurpose: z.string().nullable(),
  url: z.string().url().nullable(),
  introduction: z.string().nullable(),
});

export type PatchMemberProfileGroupMemberIdRequestDto = z.infer<
  typeof patchMemberProfileGroupMemberIdRequestDto
>;

export const getMemberGroupIdMembersResponseDto = z.array(
  z.object({
    userId: z.number().int(),
    memberId: z.number().int(),
    userName: z.string(),
    profileImageUrl: z.string().url(),
    cardId1: z.number().int(),
    position: z.string(),
    teamStatus: z.string(),
    teamId: z.number().int(),
    likeId: z.number().int(),
  }),
);

export type GetMemberGroupIdMembersResponseDto = z.infer<
  typeof getMemberGroupIdMembersResponseDto
>;

export const getMemberGroupIdPositionsResponseDto = z.array(z.string());

export type GetMemberGroupIdPositionsResponseDto = z.infer<
  typeof getMemberGroupIdPositionsResponseDto
>;

export const getMemberProfileMemberIdResponseDto = z.object({
  position: z.string(),
  workHistory: z.number().int(),
  projectGoal: z.string(),
  projectPurpose: z.string(),
  url: z.string().url(),
  introduction: z.string(),
  cardId: z.number().int(),
  numEI: z.number().int(),
  numPD: z.number().int(),
  numVA: z.number().int(),
  numCL: z.number().int(),
});

export type GetMemberProfileMemberIdResponseDto = z.infer<
  typeof getMemberProfileMemberIdResponseDto
>;

export const getMemberProfileMyResponseDto = z.object({
  position: z.string(),
  workHistory: z.number().int(),
  projectGoal: z.string(),
  projectPurpose: z.string(),
  url: z.string().url(),
  introduction: z.string(),
  cardId: z.number().int(),
  numEI: z.number().int(),
  numPD: z.number().int(),
  numVA: z.number().int(),
  numCL: z.number().int(),
});

export type GetMemberProfileMyResponseDto = z.infer<
  typeof getMemberProfileMyResponseDto
>;

export const getMemberMyprofileMiniResponseDto = z.object({
  userId: z.number().int(),
  userName: z.string(),
  imageUrl: z.string().url().nullable(),
  position: z.string().nullable(),
  teamStatus: z.string(),
  teamId: z.number().int(),
  projectGoal: z.string().nullable(),
  cardId: z.number().int(),
});

export type GetMemberMyprofileMiniResponseDto = z.infer<
  typeof getMemberMyprofileMiniResponseDto
>;
