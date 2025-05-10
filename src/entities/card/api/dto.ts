import {z} from 'zod';

// 카드 응답 DTO
export const getCardResponseDto = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  summary: z.string().optional(),
  teamStrength: z.string().optional(),
  caution: z.string().optional(),
  bestMatchCode: z.string().optional(),
  bestMatchReason: z.string().optional(),
  worstMatchCode: z.string().optional(),
  worstMatchReason: z.string().optional(),
  details: z.string().optional(),
  ei: z.number().optional(),
  pd: z.number().optional(),
  cl: z.number().optional(),
  va: z.number().optional(),
});

export type GetCardResponseDto = z.infer<typeof getCardResponseDto>;
