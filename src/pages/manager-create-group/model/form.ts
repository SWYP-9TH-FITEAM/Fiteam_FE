import {z} from 'zod';

export const initialSetInfoSchema = z.object({
  groupName: z.string(),
  groupDescription: z.string(),
  startDatetime: z.date(),
  endDatetime: z.date(),
  positionBased: z.boolean(),
});

export type InitialSetInfoSchema = z.infer<typeof initialSetInfoSchema>;

export const setInfoSchema = initialSetInfoSchema
  .extend({
    groupName: z.string().min(1),
    groupDescription: z.string().min(1),
  })
  .refine(data => data.startDatetime < data.endDatetime, {
    message: '시작 시간은 종료 시간보다 이전이어야 합니다',
    path: ['endDatetime'],
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

export const setConditionSchema = initialSetConditionSchema
  .extend({
    maxUserCount: z.number().min(1),
    minMembers: z.number().min(1),
    maxMembers: z.number().min(1),
    teamTypeDescription: z.string().min(1),
    memberCountPerPosition: z
      .array(z.object({position: z.string().min(1), count: z.number().min(1)}))
      .min(1)
      .refine(
        positions => {
          const positionNames = positions.map(p => p.position);
          return new Set(positionNames).size === positionNames.length;
        },
        {
          message: '포지션 이름은 중복될 수 없습니다',
        },
      ),
  })
  .refine(data => data.minMembers <= data.maxMembers, {
    message: '최소 인원은 최대 인원보다 작거나 같아야 합니다',
    path: ['maxMembers'],
  });

export type SetConditionSchema = z.infer<typeof setConditionSchema>;

export type InitialGroupInfo = InitialSetInfoSchema & InitialSetConditionSchema;

export type GroupInfo = SetInfoSchema & SetConditionSchema;
