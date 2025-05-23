import {z} from 'zod';

export const initialSetInfoSchema = z.object({
  groupName: z.string(),
  groupDescription: z.string(),
  startDatetime: z.string().datetime(),
  endDatetime: z.string().datetime(),
  positionBased: z.boolean(),
});

export type InitialSetInfoSchema = z.infer<typeof initialSetInfoSchema>;

export const setInfoSchema = initialSetInfoSchema.extend({
  groupName: z.string().min(1),
  groupDescription: z.string().min(1),
});

export type SetInfoSchema = z.infer<typeof setInfoSchema>;

export const initialSetConditionSchema = z.object({
  maxUserCount: z.number(),
  teamTypeDescription: z.string(),
  minMembers: z.number(),
  maxMembers: z.number(),
  memberCountPerPosition: z.array(
    z.object({position: z.string(), count: z.number()}),
  ),
});

export type InitialSetConditionSchema = z.infer<
  typeof initialSetConditionSchema
>;

export const setConditionSchema = initialSetConditionSchema.extend({
  maxUserCount: z.number().min(1),
  minMembers: z.number().min(1),
  maxMembers: z.number().min(1),
  teamTypeDescription: z.string().min(1),
  memberCountPerPosition: z
    .array(z.object({position: z.string().min(1), count: z.number().min(0)}))
    .nonempty(),
});

export type SetConditionSchema = z.infer<typeof setConditionSchema>;

export type InitialGroupInfo = InitialSetInfoSchema & InitialSetConditionSchema;

export type GroupInfo = SetInfoSchema & SetConditionSchema;
