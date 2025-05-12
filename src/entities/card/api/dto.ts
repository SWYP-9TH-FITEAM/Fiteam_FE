import {z} from 'zod';

// 카드 응답 DTO
export const getCardResponseDto = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  keyword: z.string().optional(),
  summary: z.string().optional(),
  teamStrength: z.string().optional(),
  caution: z.string().optional(),
  bestMatchCode1: z.string().optional(),
  bestMatchReason1: z.string().optional(),
  bestMatchCode2: z.string().optional(),
  bestMatchReason2: z.string().optional(),
  worstMatchCode1: z.string().optional(),
  worstMatchReason1: z.string().optional(),
  worstMatchCode2: z.string().optional(),
  worstMatchReason2: z.string().optional(),
  details: z.string().optional(),
  ei: z.number().optional(),
  pd: z.number().optional(),
  cl: z.number().optional(),
  va: z.number().optional(),
});

export type GetCardResponseDto = z.infer<typeof getCardResponseDto>;

// 카드 전체 목록 응답 DTO (배열 형태)
export const getAllCardsResponseDto = z.array(getCardResponseDto);
export type GetAllCardsResponseDto = z.infer<typeof getAllCardsResponseDto>;
