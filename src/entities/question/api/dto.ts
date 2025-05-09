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

// 문항별 점수 인터페이스 (key-value 형태: { "E": 5, "I": 0 })
export const questionScoreDto = z.record(z.string(), z.number());
export type QuestionScore = z.infer<typeof questionScoreDto>;

// 테스트 결과 요청 DTO
export const postTestResultRequestDto = z.object({
  scores: z.array(questionScoreDto),
});
export type PostTestResultRequestDto = z.infer<typeof postTestResultRequestDto>;

// 테스트 결과 응답 DTO
export const postTestResultResponseDto = z.object({
  result: z.string(),
  scores: z.array(questionScoreDto),
});
export type PostTestResultResponseDto = z.infer<
  typeof postTestResultResponseDto
>;
