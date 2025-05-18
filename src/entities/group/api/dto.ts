import {z} from 'zod';

export const postGroupSetTeamtypeGroupIdRequestDto = z.object({
  name: z.string(),
  description: z.string(),
  startDatetime: z.string().datetime(),
  endDatetime: z.string().datetime(),
  minMembers: z.number().int(),
  maxMembers: z.number().int(),
  positionBased: z.boolean(),
  configJson: z.record(z.string(), z.string()),
});

export type PostGroupSetTeamtypeGroupIdRequestDto = z.infer<
  typeof postGroupSetTeamtypeGroupIdRequestDto
>;

export const postGroupInviteRequestDto = z.object({
  groupId: z.number().int(),
  emails: z.array(z.string().email()),
});

export type PostGroupInviteRequestDto = z.infer<
  typeof postGroupInviteRequestDto
>;

export const postGroupCreateRequestDto = z.object({
  name: z.string(),
  description: z.string(),
  maxUserCount: z.number().int(),
  contactPolicy: z.string(),
});

export type PostGroupCreateRequestDto = z.infer<
  typeof postGroupCreateRequestDto
>;

export const postGroupCreateResponseDto = z.number().int();

export type PostGroupCreateResponseDto = z.infer<
  typeof postGroupCreateResponseDto
>;

export const patchGroupGroupIdUpdateRequestDto = z.object({
  name: z.string().nullable(),
  description: z.string().nullable(),
  maxUserCount: z.number().int().nullable(),
  contactPolicy: z.string().nullable(),
});

export type PatchGroupGroupIdUpdateRequestDto = z.infer<
  typeof patchGroupGroupIdUpdateRequestDto
>;

export const getGroupGroupIdDataResponseDto = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  maxUserCount: z.number().int(),
  contactPolicy: z.string(),
  createdAt: z.string().datetime(),
  teamTypeId: z.number().int(),
  teamTypeName: z.string(),
  teamTypeDescription: z.string(),
  startDatetime: z.string().datetime(),
  endDatetime: z.string().datetime(),
  minMembers: z.number().int(),
  maxMembers: z.number().int(),
  positionBased: z.boolean(),
  configJson: z.record(z.string(), z.string()),
});

export type GetGroupGroupIdDataResponseDto = z.infer<
  typeof getGroupGroupIdDataResponseDto
>;
