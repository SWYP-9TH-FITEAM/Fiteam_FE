import {z} from 'zod';

export const getQuestionsResponseDto = z.array(
  z.object({
    id: z.number(),
    dimension: z.string(),
    question: z.string(),
    typeA: z.string(),
    typeB: z.string(),
  }),
);

export type GetQuestionsResponseDto = z.infer<typeof getQuestionsResponseDto>;
